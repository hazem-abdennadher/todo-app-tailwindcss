import { FC, useEffect, useState } from 'react';
import { TodoProps } from '../../../pages/Todo';

type TodoItemProps = {
  done: boolean;
  description: string;
  addToDo?: (todo: TodoProps) => void;
};

import Check from '../../../assets/icons/icon-check.svg';
const ToDoAdder: FC<TodoItemProps> = ({ done, description, addToDo }) => {
  const [isDone, setIsDone] = useState(done);
  const [desc, setDesc] = useState('');

  const onSubmit = (e: any) => {
    e && e.preventDefault();
    if (!desc) return;
    addToDo &&
      addToDo({
        id: desc + Math.random() * 100,
        description: desc,
        done: isDone,
      });
    setDesc('');
    setIsDone(false);
  };
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        onSubmit(undefined);
      }
    });
  }, []);

  const handleClick = () => {
    setIsDone(!isDone);
  };

  return (
    <div className="flex flex-row items-center w-full gap-4 bg-white text-inherit  dark:bg-dark-secondary p-4 ">
      <div
        className={`flex justify-center items-center w-5 h-5 rounded-full border ${
          isDone && 'bg-blue-400'
        } `}
        onClick={() => handleClick()}
      >
        {isDone && <img src={Check} alt="check" />}
      </div>

      <form onSubmit={(e) => onSubmit(e)} className={'w-full'}>
        <input
          placeholder={description}
          type={'text'}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={` w-full outline-none bg-transparent  ${
            isDone && 'line-through text-gray-400'
          } `}
        />
      </form>
    </div>
  );
};

export default ToDoAdder;
