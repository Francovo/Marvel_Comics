import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detalles from '../components/Detalles/Detalles';
import { Favoritos } from '../components/Favoritos/Favoritos';
import { Home } from '../components/home/Home';
import Login from '../components/Login/Login';
import { Registro } from '../components/Login/Registro';

const AppRouters = () => {
	const [logged, setLogged] = useState(false);
	const [checking, setChecking] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [user, setUser] = useState('');

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			setUser(user);
			if (user?.uid) {
				console.log(user);
				console.log('Logueado');
				setLogged(true);
			} else {
				console.log('no log');
				setLogged(false);
			}
			setChecking(false);
		});
	}, [setLogged, setChecking]);
	if (checking) {
		return <h1>Espere...</h1>;
	}
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home logged={logged} />} />
					<Route path="/Detalles" element={<Detalles />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registro" element={<Registro />} />
					<Route path="/favoritos" element={<Favoritos />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default AppRouters;
