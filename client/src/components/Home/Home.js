import { Container, Grid, Grow,Paper,AppBar,TextFields,Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import useStyles from '../../styles';
import Paginate from '../Pagination';
import {useLocation,Navigation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
	const classes = useStyles();
	const dispatch = useDispatch();
    const query=useQuery();
    const page=query.get('page')||1;
    const searchQuery=query.get('searchQuery');

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId,dispatch]);
  return (
    <Grow in>
    <Container maxWidth="xl">
        <Grid
            container
            className={classes.gridContainer}
            justifyContent='space-between'
            alignItems='stretch'
            spacing={3}>
            <Grid item xs={12} sm={12} md={8}>
                <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item  sm={12} md={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
                <Paper className={classes.pagination} elevation={6}>
                <Paginate/>
                
                
                </Paper>
            </Grid>
        </Grid>
    </Container>
</Grow>
  )
}

export default Home
