import CardsHome from './CardsHome';
import '../../styles/Home.scss';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAsincrono } from '../../actions/actionLogin';
import { useDispatch } from 'react-redux';

export const Home = ({ logged }) => {
	const inputRef = useRef(null);
	const [InputText, setInputText] = useState('');
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const handleInputChange = () => {
		setInputText(inputRef.current.value);
	};

	const handleLogout = () => {
		dispatch(logoutAsincrono());
		navigate('/login');
	};

	console.log('logged home', logged);
	return (
		<div className="Container_Home">
			<div className="Container_Search_Comic_login">
				<div className="Container_Search_Comic">
					<input placeholder="Busca un Comic o Personaje" className="InputSearch" ref={inputRef}></input>
					<button onClick={handleInputChange} className="btnSearch">
						🔍
					</button>
				</div>
				<div className="ContainerbtnLogin">
					<Link to="/favoritos" style={{ marginRight: '1rem' }}>
						⭐
					</Link>
					{logged ? (
						<Link
							to="/login"
							className="btnLogin"
							onClick={() => {
								handleLogout();
							}}>
							Logout
						</Link>
					) : (
						<Link to="/login" className="btnLogin">
							Login
						</Link>
					)}
				</div>
			</div>
			<div className="Container_Card">
				<CardsHome InputText={InputText} />
			</div>
		</div>
	);
};
