import { userNames, getNUsers, findUserByName } from "./users.js";
import { nTitles, userPost } from "./posts.js";
import { completedTasks } from "./todos.js";
import { numOfUsersPosts, combination } from "./usersAndPosts.js";

const apiUrl: string = "https://jsonplaceholder.typicode.com/";

const fetchData = async (type: string): Promise<void> => {
  const response = await fetch(apiUrl + type);
  const data = await response.json();

  if (type === "users") {
    const userNamesList = userNames(data);
    const listOfUsers = getNUsers(2, data);
    const userFindByName = findUserByName("Leanne Graham", userNamesList);

    console.log(userNamesList);
    console.log(listOfUsers);
    console.log(userFindByName);
  } else if (type === "posts") {
    const nListTitles = nTitles(2, data);
    const targetUserPost = userPost(2, data);

    console.log(nListTitles);
    console.log(targetUserPost);
  } else if (type === "todos") {
    const completedTasksData = completedTasks(data);

    console.log(completedTasksData);
  }
};
fetchData("users");
fetchData("posts");
fetchData("todos");

const fetchAllData = async (...types: string[]): Promise<void> => {
  const fetchPromises = [...types].map((el) =>
    fetch(apiUrl + el).then((res) => res.json()),
  );
  const [usersData, postsData] = await Promise.allSettled(fetchPromises);

  const usersValue =
    usersData.status === "fulfilled" ? usersData.value : undefined;
  const postsValue =
    postsData.status === "fulfilled" ? postsData.value : undefined;

  console.log(numOfUsersPosts(postsValue));
  console.log(combination(2, usersValue, postsValue));
};
fetchAllData("users", "posts");
