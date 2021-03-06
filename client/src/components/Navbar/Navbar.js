import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import memories from '../../images/memories.jpg';
import decode from 'jwt-decode';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const dispatch=useDispatch();
	const navigate=useNavigate();
	
	const location=useLocation();


	// Logout   function 
	const Logout=()=>{

		dispatch({type:'LOGOUT'});

		navigate('/')
		setUser(null)


	}


	// useEffect for handle User login or  Store data in localStorage 
	useEffect(() => {
		const token= user?.token;
        if(token){
			const decodetoken=decode(token);
			if(decodetoken.exp*1000<new Date().getTime()) Logout();


		}

		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);
	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<div className={classes.brandContainer}>
				<Typography
					component={Link}
					to='/'
					className={classes.heading}
					variant='h3'
					align='center'>
					Memories
				</Typography>
				<img
					className={classes.image}
					src={memories}
					alt='memories'
					height='60'
				/>
			</div>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.imageUrl}>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>
							{' '}
							{user.result.name}
						</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							color='secondary' onClick={Logout}>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to='/auth'
						variant='contained'
						color='primary'>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
