import express from 'express';
import {
	createPosts,
	deletePost,
	getPost,
	getPostBySearch,
	getPosts,
	likePost,
	updatePost,
	commentPost,
} from '../controlllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.get('/search', getPostBySearch);
router.get('/:id', getPost);
router.get('/', getPosts);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likeCount', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;
