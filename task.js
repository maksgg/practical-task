"use strict"
import chalk from 'chalk';

const url = 'https://jsonplaceholder.typicode.com/';

const getData = async (type) => {
  const response = await fetch(url + type);
  const data = await response.json();

  const result = [];

  if(type === 'users') {
    result.push(names(data));
    result.push(nUsers(2, data));
    result.push(findByName('Leanne Graham', names(data)));
  }
  else if(type === 'posts') {
    console.log(data)
    result.push(nTitles(2, data));
    result.push(userPost(2, data));
  }
  else if(type === 'todos') {
    result.push(completedTasks(data));
  }

  console.log(result);
}
getData('users');
getData('posts');
getData('todos');

const getAllData = async (...types) => {
  const fetchPromises = [...types].map(el =>
    fetch(url + el).then(res => res.json())
  );
  const [usersData, postsData] = await Promise.allSettled(fetchPromises);

  console.log(numOfUsersPosts(postsData.value));
  console.log(combination(2, usersData.value, postsData.value));
}
getAllData('users', 'posts');

const names = (data) => data.map(el => el.name);

const nUsers = (n, data) => data.slice(0, n);
  
const findByName = (name, allNames) => allNames.find(el => el === name);

const nTitles = (n, data) => data.slice(0, n).map(el => el.title);

const userPost = (userId, data) => data.find(el => el.userId === userId)?.body;

const completedTasks = (data) => data.filter(el => el.completed === true);
 
const numOfUsersPosts = (data) => {
  let counter = 0;
  const arr = [];
  let obj = {};
  
    for(let i = 0; i <= data.length - 1; i++) {
      if(!obj.userId) {
        obj.userId = data[i].userId;
        counter = 1;
      } 
      else if(data[i].userId === obj.userId) {
        counter += 1
      }
      else if(obj.userId !== data[i].userId) {
        obj.numberOfPosts = counter;
        arr.push(obj);
        obj = {};
        obj.userId = data[i].userId;
        counter = 1;
      }
    }

  obj.numberOfPosts = counter;
  arr.push(obj);
    
  return arr;
};
const combination = (userId, usersData, postsData) => {
  const result = {};
  const postData = numOfUsersPosts(postsData);
  
  result.name = usersData.find(el => el.id === userId)?.name;
  result.numberOfPosts = postData.find(el => el.userId === userId)?.numberOfPosts;

  return result;
};