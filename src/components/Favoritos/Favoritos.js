import { useEffect, useState } from 'react';

import '../../styles/Home.scss';
import '../../styles/Favoritos.scss';
import { useNavigate } from 'react-router-dom';

export const Favoritos = () => {
	const [comicsFav, setComicsFav] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		setComicsFav(JSON.parse(localStorage.getItem('ComicsFav')) || []);
	}, []);

	return (
		<div className="ContainerAllCards">
			<div className="Containerh1">
				<button
					className="BtnBack"
					onClick={() => {
						navigate('/');
					}}>
					⇍
				</button>
				<h1>FAVORITOS</h1>
			</div>
			<div className="Container_All_Cards">
				{comicsFav.length !== 0 &&
					comicsFav.map((comic, index) => (
						<div to="/Detalles" key={index} className="ContainerCard">
							{comic.images.length > 0 ? (
								<img loading="lazy" alt="" src={`${comic.images[0].path}.${comic.images[0].extension}`} className="ImgCard" />
							) : (
								<img loading="lazy" src="https://www.cineycine.com/archivos/2016/07/marvel-portada.jpg" alt="" className="ImgCard" />
							)}
							<div className="Title">{comic.title}</div>
						</div>
					))}
			</div>
		</div>
	);
};
