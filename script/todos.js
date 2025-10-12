export const completedTasks = (data) => {
    return data.filter(el => el.completed === true);
};
