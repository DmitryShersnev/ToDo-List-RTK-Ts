import Header from "./Header";
import InputTask from "./InputTask";
import TasksList from "./TasksList";
import Filtrarion from "./Filtration";
import Cleaning from "./Cleaning";
import { getTasks } from "./redux/tasksSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { selectTasks, selectLoading } from "./redux/tasksSlice";
import { selectFilter } from "./redux/filterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";

function ToDo() {
  type TasksType = {
    completed: boolean;
    createdAt: string;
    description: null;
    id: number;
    title: string;
    updatedAt: string;
    userId: number;
  }[];

  const tasks: TasksType = useAppSelector(selectTasks);
  const loading = useAppSelector(selectLoading);
  const filter = useAppSelector(selectFilter);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const filteredTasks = tasks.filter((item) => {
    if (filter === "all") return true;
    if (filter === "active") return !item.completed;
    if (filter === "done") return item.completed;
  });

  const countOfActive = tasks.filter((item) => item.completed === false).length;

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate(0);
  };

  return (
    <>
      <Header />

      <InputTask />
      <hr />
      {loading ? "Loading..." : null}
      <TasksList filteredTasks={filteredTasks} />
      <hr />
      <Filtrarion />
      <hr />
      <Cleaning countOfActive={countOfActive} />
      <button onClick={() => handleClick()}>Разлогиниться</button>
    </>
  );
}

export default ToDo;
