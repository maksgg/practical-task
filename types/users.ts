type Geo = {
  lat: string;
  lng: string;
};
type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};
type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};
export type User = {
  id: number;
  name: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: Company;
};
export type Str = string | undefined;

export const userNames = (data: User[]): string[] => {
  return data.map((el) => el.name);
};

export const getNUsers = (n: number, data: User[]): User[] => {
  return data.slice(0, n);
};

export const findUserByName = (name: Str, allNames: Str[]): Str => {
  return allNames.find((el) => el === name);
};
