import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';

const Form = ({currentId,setCurrentId}) => {
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	});
	const post=useSelector((state)=>currentId?state.posts.posts.find((p)=>p._id===currentId):null);

	const classses = useStyles();
	const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
	 if(post) setPostData(post)
  }, [post]);

	const handleSubmit = (e) => {
    e.preventDefault();
	if(currentId){
		dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
	}else{
    dispatch(createPost({...postData,name:user?.result?.name},navigate));
	}
	clear();
  
  };

	const clear = () => {
		setCurrentId(null);
		setPostData({
			title: '',
			message: '',
			tags: '',
			selectedFile: '',
		})


	};
	if(!user?.result?.name){
		return(
			<Paper className={classses.paper}>
               <Typography variant="h6" align="center">
			 Please Sign In to create your own memories and  like other's memories  
			   </Typography>			
			</Paper>
		)
	}
	return (
		<Paper  className={classses.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classses.root}${classses.form}`}
				onSubmit={handleSubmit}>
				<Typography variant='h6'>{currentId?"Editing":"Creating"} a Memory</Typography>
				
				<TextField
				
				className={classses.fileInput}
					name='title'
					variant='outlined'
					label='Title'
          fullWidth
					value={postData.title}
					onChange={(e) =>
						setPostData({ ...postData, title: e.target.value })
					}
				/>
				<TextField
				
				className={classses.fileInput}
					name='message'
					variant='outlined'
					label='Message'
          fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
				
				className={classses.fileInput}
					name='tags'
					variant='outlined'
					label='Tags'
          fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(',') })
					}
				/>
				<div className={classses.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={(base64) =>
							setPostData({ ...postData, selectedFile: base64.name })
						}
					/>
				</div>
				<Button
					className={classses.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth >
					Submit
				</Button>
				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={clear}>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
