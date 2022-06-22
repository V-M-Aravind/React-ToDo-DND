import React from 'react';
import './TypeContainer.css';
type Props = {
  children: React.ReactNode;
  title: string;
};
function TypeContainer({ children, title }: Props) {
  return (
    <div className='type-container'>
      <h2>{title}</h2>
      <div className='children'>{children}</div>
    </div>
  );
}

export default TypeContainer;
