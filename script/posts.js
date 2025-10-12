export const nTitles = (n, data) => {
    return data.slice(0, n).map(el => el.title);
};
export const userPost = (userId, data) => {
    return data.find(el => el.userId === userId)?.body;
};
