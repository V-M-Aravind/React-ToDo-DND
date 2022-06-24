import React, { useEffect, useRef, useState } from 'react';
import './ToDoCard.css';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { ItemProps, MOVABLE_TYPE, ToDo } from '../model/model';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
type Props = {
  toDo: ToDo;
  deleteToDoHandler: (id: number) => void;
  completeToDoHandler: (id: number) => void;
  editToDoHandler: (id: number, editedToDo: string) => void;
  index: number;
  sortHandler: (dragIndex: number, hoverIndex: number) => void;
};
function ToDoCard({
  toDo,
  deleteToDoHandler,
  completeToDoHandler,
  editToDoHandler,
  sortHandler,
  index,
}: Props): JSX.Element {
  const [editText, setEditText] = useState<string>(toDo.toDo);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const movableRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: MOVABLE_TYPE,
    hover(item: ItemProps, monitor) {
      if (!movableRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = movableRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      sortHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const editFormHandler = () => {
    setIsEdit((p) => !p);
  };
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    editToDoHandler(toDo.id, editText);
    setIsEdit((p) => !p);
  };
  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);
  const editForm = (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        className='edit-form'
        value={editText}
        onChange={(event) => {
          setEditText(event.target.value);
        }}
        ref={inputRef}
      />
    </form>
  );
  const [collected, drag] = useDrag(() => ({
    type: MOVABLE_TYPE,
    item: { toDo, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  drag(drop(movableRef));
  return (
    <div
      className='card-container'
      ref={isEdit ? null : movableRef}
      style={{ opacity: collected.isDragging ? 0.2 : 1 }}
    >
      <span className='content'>{isEdit ? editForm : toDo.toDo}</span>
      <div className='todo-icons'>
        {!toDo.isCompleted && (
          <span>
            <FaEdit onClick={editFormHandler} />
          </span>
        )}

        <span>
          <FaCheckCircle onClick={() => completeToDoHandler(toDo.id)} />
        </span>

        <span>
          <FaTrash onClick={() => deleteToDoHandler(toDo.id)} />
        </span>
      </div>
    </div>
  );
}

export default ToDoCard;
