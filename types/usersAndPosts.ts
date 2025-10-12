import { User } from "./users.js";
import { UserPost } from "./posts.js";

type NumOfPosts = number | undefined;
type ForUser = {
  userId: number;
  numberOfPosts: NumOfPosts;
};
type ForUsersPosts = {
  name: string | undefined;
  numberOfPosts: NumOfPosts;
};
export const numOfUsersPosts = (data: UserPost[]): ForUser[] => {
  let counter: number = 0;
  const arr: ForUser[] = [];
  let obj: ForUser | null = null;

  for (let i = 0; i <= data.length - 1; i++) {
    const userData: UserPost = data[i];

    if (!obj) {
      obj = {
        userId: userData.userId,
        numberOfPosts: 1,
      };
      counter = 1;
    } else if (userData.userId === obj.userId) {
      counter += 1;
      obj.numberOfPosts = counter;
    } else {
      arr.push(obj);
      obj = {
        userId: userData.userId,
        numberOfPosts: 1,
      };
      counter = 1;
    }
  }

  if (obj) {
    arr.push(obj);
  }

  return arr;
};
export const combination = (
  userId: number,
  usersData: User[],
  postsData: UserPost[],
): ForUsersPosts => {
  const result: ForUsersPosts = {
    name: "",
    numberOfPosts: 0,
  };
  const postData = numOfUsersPosts(postsData);

  result.name = usersData.find((el) => el.id === userId)?.name;
  result.numberOfPosts = postData.find(
    (el) => el.userId === userId,
  )?.numberOfPosts;

  return result;
};
