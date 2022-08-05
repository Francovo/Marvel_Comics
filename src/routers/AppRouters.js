import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detalles from '../components/Detalles/Detalles';
import { Home } from '../components/home/Home';

const AppRouters = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Detalles" element={<Detalles />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default AppRouters;
