import axios from 'axios';

   

// Previous Version of api call 

// const url='http://localhost:5000/posts';
//  export const fetchPosts=()=> axios.get(url);
//  export const createPost=(newPost)=>axios.post(url,newPost);
//  export const updatePost=(id,updatePost)=>axios.patch(`${url}/${id}`,updatePost)
//  export const deletePost=(id)=>axios.delete(`${url}/${id}`);
//  export const updateLike=(id)=>axios.patch(`${url}/${id}/likeCount`);



// Update version of api call 
const API=axios.create({baseURL:'http://localhost:5000'});
 export const fetchPosts=()=> API.get("/posts");
 export const createPost=(newPost)=>API.post('/posts',newPost);
 export const updatePost=(id,updatePost)=>API.patch(`$posts/${id}`,updatePost)
 export const deletePost=(id)=>API.delete(`$posts/${id}`);
 export const updateLike=(id)=>API.patch(`$posts/${id}/likeCount`);



 export const signIn=(formData)=>API.post('/users/signin',formData);
 export const signUp=(formData)=>API.post('/users/signup',formData);
