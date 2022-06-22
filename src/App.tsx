import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import { ToDo } from './components/model/model';
import NewToDo from './components/new-to-do/NewToDo';
import ToDoCard from './components/todoCard/ToDoCard';

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
  return (
    <>
      <Header />
      <NewToDo setToDos={setToDos} />
      <div className='todos-container'>
        {toDos.map((toDo) => (
          <ToDoCard
            key={toDo.id}
            toDo={toDo}
            deleteToDoHandler={deleteToDoHandler}
            completeToDoHandler={completeToDoHandler}
            editToDoHandler={editToDoHandler}
          />
        ))}
      </div>
    </>
  );
}

export default App;
