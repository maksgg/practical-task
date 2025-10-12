import { Str } from "./users.js";

export type UserPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const nTitles = (n: number, data: UserPost[]): string[] => {
  return data.slice(0, n).map((el) => el.title);
};

export const userPost = (userId: number, data: UserPost[]): Str => {
  return data.find((el) => el.userId === userId)?.body;
};
