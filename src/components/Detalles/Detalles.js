import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listarComicsActionAsincrono } from '../../actions/actionComics';
import '../../styles/Detalles.scss';

const Detalles = (offset) => {
	const { comicDetail } = useSelector((store) => store.details);
	console.log('ComicDetail', comicDetail[0]);
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const BackHome = (offset) => {
		dispatch(listarComicsActionAsincrono(offset));
	};

	return (
		<>
			<div className="ContainerDetails">
				<button
					className="BtnBack"
					onClick={() => {
						navigate('/');
						BackHome(offset);
					}}>
					⇍
				</button>
				<img src={comicDetail[0]?.img} alt="" />
				<div className="ContainerDetailChar">
					{comicDetail[0]?.details?.length > 0 ? (
						<>
							<h1 className="ComicDetails">{comicDetail[0].details}</h1> <h2>CHARACTERS</h2>
						</>
					) : (
						<h1 className="ComicDetails">NO DISPONIBLE 🔍</h1>
					)}
					<div className="ContainerChar">
						{comicDetail[0].characters &&
							comicDetail[0].characters.map((char, index) => (
								<div key={index} className="Char">
									<img src={`${char}.jpg`} alt="" className="charimg" />
									<label> {char.name}</label>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Detalles;
