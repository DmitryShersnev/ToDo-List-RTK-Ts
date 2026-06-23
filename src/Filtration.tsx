import { all, active, done } from "./redux/filterSlice";
import type React from "react";
import { useAppDispatch } from "./redux/hooks/hooks";

const Filtrarion: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleClickAll = () => {
    dispatch(all());
  };
  const handleClickActive = () => {
    dispatch(active());
  };
  const handleClickDone = () => {
    dispatch(done());
  };
  return (
    <>
      <button onClick={handleClickAll}>Все</button>
      <button onClick={handleClickActive}>Активные</button>
      <button onClick={handleClickDone}>Завершённые</button>
    </>
  );
};
export default Filtrarion;
