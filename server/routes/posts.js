import express from 'express';
import {getPost,getPostBySearch,getPosts,createPosts,updatePost,deletePost,likePost} from '../controlllers/posts.js'
import auth from '../middleware/auth.js';

const router=express.Router();
router.get('/:id',getPost)
router.get('/search',getPostBySearch)
router.get('/',getPosts);
router.post('/',auth,createPosts);
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost);
router.patch('/:id/likeCount',auth,likePost);



export default router;


