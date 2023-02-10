import Data from '../data.json';
export type TodoProps = {
  description: string;
  done: boolean;
  id: string;
};
import Moon from '../assets/icons/icon-moon.svg';
import Sun from '../assets/icons/icon-sun.svg';
import LightBg from '../assets/images/bg-desktop-light.jpg';
import DarkBg from '../assets/images/bg-desktop-dark.jpg';
import LightMBg from '../assets/images/bg-mobile-light.jpg';
import DarkMBg from '../assets/images/bg-mobile-dark.jpg';
import ToDoAdder from '../components/common/todo-adder';
import { DragEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../context/theme';
import TodoItem from '../components/common/todo-item';
import Filter from '../components/common/filter';
import useMediaQuery from '../hooks/useMediaQuery';

const Todo = () => {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [todos, setTodos] = useState(Data.todos);
  const dragItem = useRef<number | null>();
  const dragItemOver = useRef<number | null>();

  const [activeFilter, setActiveFilter] = useState<
    'all' | 'active' | 'completed'
  >('all');

  const addTodo = (todo: TodoProps) => {
    setTodos([...todos, todo]);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.done);
    setTodos(newTodos);
  };

  const toggleTodo = (id: string) => {
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, done: !t.done };
      }
      return t;
    });
    setTodos(newTodos);
  };
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const index1 = dragItem.current as number;
    const index2 = dragItemOver.current as number;
    if (index1 !== index2) {
      let _newElemets = [...todos];
      const draggedItem = _newElemets.splice(index1, 1)[0];
      _newElemets.splice(index2, 0, draggedItem);
      setTodos(_newElemets);
    }
    dragItem.current = null;
    dragItemOver.current = null;
  };

  const FiltredItems = useMemo(() => {
    return todos.filter(
      (todo) =>
        activeFilter === 'all' ||
        (activeFilter === 'active' ? !todo.done : todo.done)
    );
  }, [todos, activeFilter]);
  return (
    <div className=" transition-all duration-100 text-sm sm:text-lg font-Josefin relative h-screen w-screen flex text-black dark:text-white  justify-center items-center dark:bg-dark-primary">
      <div className="absolute w-screen h-[50vh] top-0 left-0 z-0 ">
        <img
          className="w-full h-full object-cover"
          src={
            theme === 'dark'
              ? isMobile
                ? DarkMBg
                : DarkBg
              : isMobile
              ? LightMBg
              : LightBg
          }
          alt="background"
        />
      </div>
      <main className=" w-max flex flex-col gap-8 z-[1] ">
        <div className="flex flex-col gap-8 w-full">
          <header className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-white">TODO</h1>
            <img
              className="cursor-pointer"
              src={theme === 'dark' ? Sun : Moon}
              alt="theme"
              onClick={toggleTheme}
            />
          </header>
          <div className="drop-shadow-lg rounded-md overflow-hidden">
            <ToDoAdder
              description={'Add a new todo'}
              done={false}
              addToDo={addTodo}
            />
          </div>
        </div>
        <div className="bg-white  dark:bg-dark-secondary flex flex-col drop-shadow-lg rounded-md rounded-top overflow-hidden w-max">
          {FiltredItems.map((todo, i: number) => (
            <div
              key={todo.id}
              draggable
              onDragStart={() => {
                dragItem.current = i;
              }}
              onDragEnter={() => {
                dragItemOver.current = i;
              }}
              onDragEnd={onDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <TodoItem
                id={todo.id}
                toggleDone={toggleTodo}
                description={todo.description}
                done={todo.done}
              />
            </div>
          ))}
          <Filter
            itemleft={FiltredItems.length}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
            clearCompleted={clearCompleted}
          />
        </div>
      </main>
    </div>
  );
};

export default Todo;
