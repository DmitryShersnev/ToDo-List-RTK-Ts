import { change, clearInput } from "./redux/inputTextSlice";
import { setInputError, clearInputError } from "./redux/inputErrorSlice";
import { createTask } from "./redux/tasksSlice";
import { selectInputText } from "./redux/inputTextSlice";
import { selectInputError } from "./redux/inputErrorSlice";
import type React from "react";
import type { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";

const InputTask: React.FC = () => {
  const inputText = useAppSelector(selectInputText);
  const inputError = useAppSelector(selectInputError);

  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(change(e.target.value));
  };

  const handleClick = () => {
    if (inputText.length === 0 || inputText.trim() === "") {
      dispatch(setInputError());
    } else {
      dispatch(createTask(inputText));
      dispatch(clearInputError());
      dispatch(clearInput());
    }
  };
  return (
    <>
      <input value={inputText} onChange={handleChange} />
      <button onClick={handleClick}>Добавить</button>
      <br />
      {inputError && (
        <p style={{ color: "red" }}>
          Строка не должна быть пустой или состоять только из пробелов
        </p>
      )}
    </>
  );
};

export default InputTask;
