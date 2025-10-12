export const userNames = (data) => {
    return data.map(el => el.name);
};
export const getNUsers = (n, data) => {
    return data.slice(0, n);
};
export const findUserByName = (name, allNames) => {
    return allNames.find(el => el === name);
};
