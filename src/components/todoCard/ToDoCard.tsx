import React, { useEffect, useRef, useState } from 'react';
import './ToDoCard.css';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { ToDo } from '../model/model';
type Props = {
  toDo: ToDo;
  deleteToDoHandler: (id: number) => void;
  completeToDoHandler: (id: number) => void;
  editToDoHandler: (id: number, editedToDo: string) => void;
};
function ToDoCard({
  toDo,
  deleteToDoHandler,
  completeToDoHandler,
  editToDoHandler,
}: Props): JSX.Element {
  const [editText, setEditText] = useState<string>(toDo.toDo);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
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
  const renderingText = toDo.isCompleted ? <s>{toDo.toDo}</s> : toDo.toDo;
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
  return (
    <div className='card-container'>
      <div className='content'>{isEdit ? editForm : renderingText}</div>
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
