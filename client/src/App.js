import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

const App = () => {
	return (
		<BrowserRouter>
			<Container maxWidth='lg'>
				<Navbar />

				<Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/auth' element={<Auth/>} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

export default App;
