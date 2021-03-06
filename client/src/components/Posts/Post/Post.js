import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';
import {useNavigate} from 'react-router-dom'

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate=useNavigate();
	const user = JSON.parse(localStorage.getItem('profile'));

	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find(
				(like) => like === (user?.result?.googleId || user?.result?._id)
			) ? (
				<div>
					<ThumbUpAlt fontSize='small' />
					&nbsp; &nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1}others`
						: `${post.likes.length}like ${
								post.likes.lenght > 1 ? 's' : ''
						  }`}
				</div>
			) : (
				<div>
					<ThumbUpAltOutlined fontSize='small' /> &nbsp;
					{post.likes.length}
					{post.likes.length === 1 ? 'Like' : 'Likes'}
				</div>
			);
		}
		return (
			<div>
				<ThumbUpAltOutlined fontSize='small' /> &nbsp; Like
			</div>
		);
	};
	const openPosts=()=>{
		navigate(`/posts/${post._id}`)

	}
	return (
		<Card className={classes.card}  >
		
		
		
		
			<CardMedia
				className={classes.media}
				image={`img/${post.selectedFile}`}
				title={post.title}
				style={{cursor:'pointer'}}  onClick={openPosts}
			/>
			<div className={classes.overlay}>
				<Typography variant='h6'>{post.name}</Typography>
				<Typography variant='body2'>
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			<div className={classes.overlay2}>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						style={{ color: 'white' }}
						size='small'
						onClick={() => {
							setCurrentId(post._id);
						}}>
						<MoreHorizIcon fontSize='medium' />
					</Button>
				)}
			</div>
			
			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary'>
					{post.tags.map((tag) => `#${tag}`)}
				</Typography>
			</div>
			
			<Typography className={classes.title} variant='h5' gutterBottom>
				{post.title}
			</Typography>

			<CardContent>
				<Typography variant='body2' color='textSecondary' component='p'>
					{post.message}
				</Typography>
			</CardContent>
			
			<CardActions className={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					disabled={!user}
					onClick={() => {
						dispatch(likePost(post._id));
					}}>
					<Likes />
				</Button>

				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						size='small'
						color='primary'
						onClick={() => {
							dispatch(deletePost(post._id));
						}}>
						<DeleteIcon fontSize='small' />
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
