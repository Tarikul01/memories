import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
// import AuthPage from './AuthPage';
import Icon from './Icon';
import Input from './input';
import useStyles from './Styles';
import { gapi } from 'gapi-script';
import {useDispatch} from 'react-redux';

const Auth = () => {
	const classes = useStyles();
	const dispatch=useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const handleSubmit = () => {};
	const handleChange = () => {};
	const handleShowPassword = () => setShowPassword(!showPassword);
	const switchMode = () => {
		setIsSignup(!isSignup);
		handleShowPassword(false);
	};



	// Initially load clientId before checking 
	useEffect(() => {
		function start() {
		  gapi.client.init({
			clientId:"653087626307-gng3oocg58u6v0a8aippc4ulmkltj2dn.apps.googleusercontent.com",
			scope: 'email',
		  });
		}
	
		gapi.load('client:auth2', start);
	  }, []);


	//   Google Loginin Successfully 
	const googleSucces = async (res) => {
		const result=res?.profileObj;
		const token=res?.tokenId;
		try {
			dispatch({type:'AUTH',data:{result,token}})
			
		} catch (err) {
			console.log(err)
			
		}
	};

	// Google SignIn failed 
	const googleFailure = (error) => {
		console.log(error)
		console.log('Google Sign In was unsuccessfull. Try Again Letter');
	};
	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography variant='h5'>
					{isSignup ? 'Sign Up' : 'Sign In'}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<div>
								<Input
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									half
								/>
							</div>
						)}
						<Input
							name='email'
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Repeat Password'
								handleChange={handleChange}
								type='password'
							/>
						)}
					</Grid>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<GoogleLogin
						clientId={"653087626307-gng3oocg58u6v0a8aippc4ulmkltj2dn.apps.googleusercontent.com"}
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color='primary'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant='contained'>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSucces}
						onFailure={googleFailure}
						cookiePolicy={'single_host_origin'}
						isSignedIn={true}
					/>
				
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? 'Already have an account? Sign In!'
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
