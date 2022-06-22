import React, { useRef, useState } from 'react';
import { ToDo } from '../model/model';
type Props = {
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
};
const NewToDo = ({ setToDos }: Props): JSX.Element => {
  const [toDo, setToDo] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (toDo.length < 1) return;
    inputRef.current?.blur();
    setToDos((p) => [{ id: Date.now(), toDo, isCompleted: false }, ...p]);
    setToDo('');
  };
  return (
    <form className='form-newtodo' onSubmit={submitHandler}>
      <input
        type='text'
        placeholder='Enter a task'
        onChange={(event) => {
          setToDo(event.target.value);
        }}
        value={toDo}
        ref={inputRef}
      />
      <button type='submit'>Go</button>
    </form>
  );
};

export default NewToDo;
