import {
	CircularProgress,
	Divider,
	Paper,
	Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import useStyles from './style';
const PostDetails = () => {
	const posts = useSelector((state) => state.posts);
	const post = posts.post;
	const isLoading = posts.isLoading;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = useStyles();
	const { id } = useParams();
	useEffect(() => {
		dispatch(getPost(id));
	}, [id]);

	if (!post) return null;
	if (isLoading) {
		return (
			<Paper elevation={6} className={classes.loadingPaper}>
				<CircularProgress size='7em' />
			</Paper>
		);
	}
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
					<Typography variant='body1'>
						<strong>Comments - comming soon!</strong>
					</Typography>
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
		</Paper>
	);
};

export default PostDetails;
