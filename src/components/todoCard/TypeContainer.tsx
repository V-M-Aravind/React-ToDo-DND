import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ItemProps, MOVABLE_TYPE, ToDo } from '../model/model';
import './TypeContainer.css';
type Props = {
  children: React.ReactNode;
  title: string;
  onDrop: (tile: string, item: ItemProps, monitor: DropTargetMonitor) => void;
};
function TypeContainer({ children, title, onDrop }: Props) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: MOVABLE_TYPE,
    drop: (item: ItemProps, monitor) => {
      onDrop(title, item, monitor);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const highlight = isOver ? 'highlight' : 'normal-bg';
  return (
    <div className={`type-container ${highlight}`} ref={drop}>
      <h2>{title}</h2>
      <div className='children'>{children}</div>
    </div>
  );
}

export default TypeContainer;
