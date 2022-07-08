import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
	const user=JSON.parse(localStorage.getItem('profile'));
	return (
		<BrowserRouter>
			<Container maxWidth='lg'>
				<Navbar />

				<Routes>
					
					<Route path="/" element={<Navigate replace to="/posts" />} />
					<Route path='/posts' element={<Home/>} />
					<Route path='/posts/search' element={<Home/>} />
					<Route path='/posts/:id' element={<PostDetails />} />
					<Route path='/auth' element={!user?<Auth />: <Navigate replace to="/posts" />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

export default App;
