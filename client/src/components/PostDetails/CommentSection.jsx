import React,{useState,useRef} from 'react';
import { Typography,TextField,Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './style';
import {commentPost} from '../../actions/posts';



const CommentSection = ({post}) => {
    const [comments,setComments]=useState([1,2,3]);
    const [comment,setComment]=useState('');

     const classes=useStyles();
     const dispatch=useDispatch();
     const user=JSON.parse(localStorage.getItem('user'));
     const handleClick=()=>{
        const finalComment=`${user.result.name}:${comment}`;
        dispatch(commentPost(finalComment,post._id));

     }
  return (
    <div>
    <div className={classes.commentsOuterContainer}>
    <div className={classes.commentsInnerContainer}>
    <Typography gutterBottom variant="h6">
    </Typography>
    {
        comments.map((c,i)=>(
            <Typography key={i} gutterBottom variant='subtitle1'>Comment{i}</Typography>
        ))
    }
    </div>
    <div style={{width:'70%'}}>
    <Typography gutterBottom variant="h6">Write a Comment ...</Typography>
    <TextField
    fullWidth
    rows={4}
    variant='outlined'
    label="Comment"
    multilin 
    value={comment}
    onChange={(e)=>setComment(e.target.value)}
    />
    <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick}>Comment</Button>
    
    </div>
    </div>
    </div>
  )
}

export default CommentSection
