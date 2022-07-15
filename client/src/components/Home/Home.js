import {
	AppBar,
	Button,
	Container,
	Grid,
	Grow,
	Paper,
	TextField,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from '../../styles';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import Posts from '../Posts/Posts';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const [currentId, setCurrentId] = useState(null);
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);
	const classes = useStyles();
	const dispatch = useDispatch();
	const query = useQuery();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const navigate = useNavigate();

	// useEffect(() => {
	// 	dispatch(getPosts());
	// }, [currentId,dispatch]);
	const searchPost = () => {
		if (search.trim() || tags) {
			// dispatch -> fetch search post
			dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
			// <Navigate replace to={`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') }`}/>
			navigate(
				`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(
					','
				)}`
			);
			// console.log(search.trim())
		} else {
			<Navigate to='/' />;
		}
	};
	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			// Search post
		}
	};
	const handleAdd = (tag) => setTags([...tags, tag]);
	const handleDelete = (tagToDelete) =>
		setTags(tags.filter((tag) => tag !== tagToDelete));

	return (
		<Grow in>
			<Container maxWidth='xl'>
				<Grid
					container
					className={classes.gridContainer}
					justifyContent='space-between'
					alignItems='stretch'
					spacing={3}>
					<Grid item xs={12} sm={6} md={8}>
					<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xl={12} sm={6} md={4}>
						<AppBar
							className={classes.appBarSearch}
							position='static'
							color='inherit'>
							<TextField
								name='search'
								variant='outlined'
								label='Search Memories'
								fullWidth
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
								onKeyPress={handleKeyPress}
							/>
							<ChipInput
								style={{ margin: '10px 0' }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label='Search Tags'
								variant='outlined'
							/>
							<Button
								onClick={searchPost}
								className={classes.searchButton}
								variant='contained'
								color='primary'>
								Search
							</Button>
						</AppBar>

						<Form
							currentId={currentId}
							setCurrentId={setCurrentId}
						/>
						{(!searchQuery && !tags.length) && (
							<Paper className={classes.pagination} elevation={6}>
								<Paginate page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
