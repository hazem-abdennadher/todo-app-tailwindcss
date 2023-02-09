import { FC } from 'react';

type FilterProps = {
  itemleft: number;
  activeFilter: 'all' | 'active' | 'completed';
  setActiveFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
};
const Filter: FC<FilterProps> = ({
  activeFilter,
  itemleft,
  setActiveFilter,
  clearCompleted,
}) => {
  return (
    <div className="flex text-gray-500 flex-row justify-around gap-4 sm:gap-8  items-center p-4">
      <p className="text-gray-400">{itemleft} items left</p>
      <div className="flex flex-row items-center gap-1 sm:gap-4 capitalize">
        <span
          onClick={() => {
            setActiveFilter('all');
          }}
          className={` cursor-pointer ${
            activeFilter === 'all' && 'text-blue-600'
          } dark:hover:text-white hover:text-black `}
        >
          All
        </span>
        <span
          className={` cursor-pointer ${
            activeFilter === 'active' && 'text-blue-600'
          } dark:hover:text-white hover:text-black`}
          onClick={() => {
            setActiveFilter('active');
          }}
        >
          Active
        </span>
        <span
          className={` cursor-pointer ${
            activeFilter === 'completed' && 'text-blue-600'
          } dark:hover:text-white hover:text-black`}
          onClick={() => {
            setActiveFilter('completed');
          }}
        >
          Completed
        </span>
      </div>
      <button
        className={`cursor-pointer dark:hover:text-white hover:text-black `}
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default Filter;
