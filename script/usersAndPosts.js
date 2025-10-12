export const numOfUsersPosts = (data) => {
    let counter = 0;
    const arr = [];
    let obj = null;
    for (let i = 0; i <= data.length - 1; i++) {
        const userData = data[i];
        if (!obj) {
            obj = {
                userId: userData.userId,
                numberOfPosts: 1
            };
            counter = 1;
        }
        else if (userData.userId === obj.userId) {
            counter += 1;
            obj.numberOfPosts = counter;
        }
        else {
            arr.push(obj);
            obj = {
                userId: userData.userId,
                numberOfPosts: 1
            };
            counter = 1;
        }
    }
    if (obj) {
        arr.push(obj);
    }
    return arr;
};
export const combination = (userId, usersData, postsData) => {
    const result = {
        name: '',
        numberOfPosts: 0
    };
    const postData = numOfUsersPosts(postsData);
    result.name = usersData.find(el => el.id === userId)?.name;
    result.numberOfPosts = postData.find(el => el.userId === userId)?.numberOfPosts;
    return result;
};
