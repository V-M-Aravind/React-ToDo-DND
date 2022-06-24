import React, { useState } from 'react';
import { DndProvider, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import Header from './components/header/Header';
import { ItemProps, ToDo } from './components/model/model';
import NewToDo from './components/new-to-do/NewToDo';
import ToDoCard from './components/todoCard/ToDoCard';
import TypeContainer from './components/todoCard/TypeContainer';

function App(): JSX.Element {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const editToDoHandler = (id: number, editedToDo: string) => {
    setToDos((p) =>
      p.map((todo) =>
        todo.id === id ? { id, toDo: editedToDo, isCompleted: false } : todo
      )
    );
  };
  const deleteToDoHandler = (id: number) => {
    setToDos((p) => p.filter((todo) => todo.id !== id));
  };
  const completeToDoHandler = (id: number) => {
    setToDos((p) =>
      p.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const sortHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = toDos[dragIndex];
    if (dragItem) {
      setToDos((prevState) => {
        const copyPrevState = prevState.slice();
        const hoverItem = copyPrevState.splice(hoverIndex, 1, dragItem);
        copyPrevState.splice(dragIndex, 1, hoverItem[0]);
        return copyPrevState;
      });
    }
  };
  const onDrop = (
    title: string,
    item: ItemProps,
    monitor: DropTargetMonitor
  ) => {
    if (title === 'ToDos') {
      setToDos((p) =>
        p.map((l) => (l.id === item.toDo.id ? { ...l, isCompleted: false } : l))
      );
    } else {
      setToDos((p) =>
        p.map((l) => (l.id === item.toDo.id ? { ...l, isCompleted: true } : l))
      );
    }
  };
  return (
    <>
      <Header />
      <NewToDo setToDos={setToDos} />
      <div className='todos-container'>
        <DndProvider backend={HTML5Backend}>
          <TypeContainer title='ToDos' onDrop={onDrop}>
            {toDos.map((toDo, index) =>
              toDo.isCompleted ? (
                ''
              ) : (
                <ToDoCard
                  key={toDo.id}
                  toDo={toDo}
                  deleteToDoHandler={deleteToDoHandler}
                  completeToDoHandler={completeToDoHandler}
                  editToDoHandler={editToDoHandler}
                  index={index}
                  sortHandler={sortHandler}
                />
              )
            )}
          </TypeContainer>
          <TypeContainer title='Completed' onDrop={onDrop}>
            {toDos.map((toDo, index) =>
              toDo.isCompleted ? (
                <ToDoCard
                  key={toDo.id}
                  toDo={toDo}
                  deleteToDoHandler={deleteToDoHandler}
                  completeToDoHandler={completeToDoHandler}
                  editToDoHandler={editToDoHandler}
                  index={index}
                  sortHandler={sortHandler}
                />
              ) : (
                ''
              )
            )}
          </TypeContainer>
        </DndProvider>
      </div>
    </>
  );
}

export default App;
