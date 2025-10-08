"use strict"

async function users(url) {
  const response = await fetch(url);
  const data = await response.json();

  // console.log(data);

  const numberOfAllUsers = () => data.length;
  
  console.log(numberOfAllUsers());

  const names = () => {
    let result = [];

    for(const el of data) {
      result.push(el.name);
    }

    return result;
  };

  console.log(names());

  const nUsers = (n) => data.slice(0, n);

  console.log(nUsers(2));

  
  const findByName = (name) => {
    const allNames = names();
    
    return allNames.find(el => el === name);
  };

  console.log(findByName('Leanne Graham'));
}

users('https://jsonplaceholder.typicode.com/users');

async function post(url) {
  const response = await fetch(url);
  const data = await response.json();

  // console.log(data);

  const nTitles = (n) => data.slice(0, n).map(el => el.title);

  console.log(nTitles(2));

  const userPost = (userId) => {
    for(const el of data) {
      if(el.id === userId) {
        return el.body;
      }
    }
  };

  console.log(userPost(100));
}

post('https://jsonplaceholder.typicode.com/posts');

async function todos(url) {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  const completedTasks = () => data.filter(el => el.completed === true);

  console.log(completedTasks());
}
todos('https://jsonplaceholder.typicode.com/todos');


async function tinyAnalytics(arrOfUrls) {
  const fetchPromises = arrOfUrls.map(el => 
    fetch(el).then(res => res.json())
  );
  const [usersData, postsData] = await Promise.all(fetchPromises);

  // console.log(usersData);
  // console.log(postsData);

  const numOfUsersPosts = () => {
    let counter = 0;
    let arr = [];
    let obj = {};
    
      for(let i = 0; i <= postsData.length - 1; i++) {
        if(!obj.userId) {
          obj.userId = postsData[i].userId;
          counter = 1;
        } 
        else if(postsData[i].userId === obj.userId) {
          counter += 1
        }
        else if(obj.userId !== postsData[i].userId) {
          obj.numberOfPosts = counter;
          arr.push(obj);
          obj = {};
          obj.userId = postsData[i].userId;
          counter = 1;
        }
      }

      obj.numberOfPosts = counter;
      arr.push(obj);
      
      return arr;

  };

  console.log(numOfUsersPosts());

  const combination = (userId) => {
    let result = {};

    for(const user of usersData) {
      if(user.id === userId) {
        result.name = user.name;
      }
    }

    for(const el of numOfUsersPosts()) {
      if(el.userId === userId) {
        result.numberOfPosts = el.numberOfPosts;
      }
    }

    return result;
  };

  console.log(combination(1));
  
}

const fetchUrs = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts'
];

tinyAnalytics(fetchUrs);