import type React from "react";
import { deleteDoneTasks } from "./redux/tasksSlice";

import { useAppDispatch } from "./redux/hooks/hooks";

type PropsType = {
  countOfActive: number;
};

const Cleaning: React.FC<PropsType> = ({ countOfActive }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="cleaning">
      <p>Осталось дел: {countOfActive} </p>
      <button onClick={() => dispatch(deleteDoneTasks())}>
        Удалить выполненные
      </button>
    </div>
  );
};
export default Cleaning;
