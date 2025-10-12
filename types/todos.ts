type Todos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const completedTasks = (data: Todos[]): Todos[] => {
  return data.filter((el) => el.completed === true);
};
