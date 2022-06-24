export type ToDo = {
  id: number;
  toDo: string;
  isCompleted: boolean;
};
export type ItemProps = { toDo: ToDo; index: number };
export const MOVABLE_TYPE = 'todo-card';
