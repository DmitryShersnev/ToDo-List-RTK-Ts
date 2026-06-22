import Task from "./Task";

type PropsType = {
  filteredTasks: {
    completed: boolean;
    createdAt: string;
    description: null;
    id: number;
    title: string;
    updatedAt: string;
    userId: number;
  }[];
};

const TasksList: React.FC<PropsType> = ({ filteredTasks }) => {
  return (
    <>
      {filteredTasks.map((item) => (
        <Task key={item.id} item={item} />
      ))}
    </>
  );
};

export default TasksList;
