import {
	CircularProgress,
	Divider,
	Paper,
	Typography,
} from '@material-ui/core';
import moment from 'moment';
import CommentSection from './CommentSection';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './style';
const PostDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = useStyles();
	const { id } = useParams();
	const { posts, post, isLoading } = useSelector((state) => state.posts);
	// const post = posts.post;
	useEffect(() => {
		if (id) {
			dispatch(getPost(id));
		}
	}, [id]);
	useEffect(() => {
		if (post) {
			dispatch(
				getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })
			);
		}
	}, [post]);

	const recomendedPosts = posts.filter(({ _id }) => _id !== id);

	if (!post) return null;
	if (isLoading) {
		return (
			<Paper elevation={6} className={classes.loadingPaper}>
				<CircularProgress size='7em' />
			</Paper>
		);
	}
	const openPost = (_id) => {
		navigate(`/posts/${_id}`);
	};
	return (
		<Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
			<div className={classes.card}>
				<div className={classes.section}>
					<Typography variant='h3' component='h2'>
						{post.title}
					</Typography>
					<Typography
						gutterBottom
						variant='h6'
						color='textSecondary'
						component='h2'>
						{post.tags.join('#')}
					</Typography>
					<Typography variant='body1' component='p' gutterBottom>
						{post.message}
					</Typography>
					<Typography variant='h6'>Created by:{post.name}</Typography>
					<Typography variant='body1'>
						{moment(post.createdAt).fromNow()}
					</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Typography variant='body1'>
						<strong>Realtime Chat comming - soon !.....</strong>
					</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<CommentSection post={post}/>
					<Divider style={{ margin: '20px 0' }} />
				</div>
				<div className={classes.imageSection}>
					<img
						alt='nothing'
						className={classes.media}
						src={
							post.selectedFile ||
							'https://picsum.photos/600/300?random=1'
						}
					/>
				</div>
			</div>
			{recomendedPosts.length && (
				<div className={classes.section}>
					<Typography gutterBottom variant='h5'>
						You might also like:{' '}
					</Typography>
					<Divider />
					<div className={classes.recomendedPosts}>
						{recomendedPosts.map(
							({
								title,
								message,
								name,
								likes,
								selectedFile,
								_id,
							}) => (
								<div
									key={_id}
									style={{
										margin: '20px',
										cursor: 'pointer',
									}}
									onClick={() => openPost(_id)}>
									<Typography gutterBottom variant='h6' >{title}</Typography>
									<Typography gutterBottom variant='subtitle2' >{name}</Typography>
									<Typography gutterBottom variant='subtitle2' >{message}</Typography>
									<Typography gutterBottom variant='subtitle1' >Likes: {likes.length}</Typography>
								</div>
							)
						)}
					</div>
				</div>
			)}
		</Paper>
	);
};

export default PostDetails;
