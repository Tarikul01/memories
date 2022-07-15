import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import {Grid,CircularProgress} from '@material-ui/core';

const Posts = ({setCurrentId}) => {
    const classes=useStyles();
    const posts=useSelector((state)=>state.posts);
    console.log(posts.posts)
    console.log(posts.isLoading)
    // console.log(posts)
   
    if(!posts.posts.length && !posts.isLoading) return 'No posts !';
  return (
    posts.isLoading?<CircularProgress/> :(
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
    {
      posts.posts.map((post)=>(
        <Grid key={post._id} item xs={12} sm={6}>
        <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))
    }

      </Grid>
    )
  )
}

export default Posts
