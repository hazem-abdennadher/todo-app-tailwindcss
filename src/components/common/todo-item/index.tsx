import { FC } from 'react';
type TodoItemProps = {
  id: string;
  done: boolean;
  description: string;
  toggleDone: (id: string) => void;
};

import Check from '../../../assets/icons/icon-check.svg';
import Cross from '../../../assets/icons/icon-cross.svg';
const TodoItem: FC<TodoItemProps> = ({ done, description, id, toggleDone }) => {
  const handleClick = (id: string) => {
    toggleDone && toggleDone(id);
  };

  return (
    <div className="group w-full flex flex-row items-center gap-4 bg-inherit p-4 text-inherit dark:border-dark-quinary border-b">
      <div
        className={`flex justify-center items-center w-5 h-5 rounded-full border ${
          done && 'bg-blue-400'
        } `}
        onClick={() => handleClick(id)}
      >
        {done && <img src={Check} alt="check" />}
      </div>
      <div className="flex justify-between items-center w-full">
        <p className={` ${done && 'line-through text-gray-400'} `}>
          {description}
        </p>
        <div className="cursor-pointer hidden group-hover:block w-4 h-4">
          <img src={Cross} alt="cross" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
