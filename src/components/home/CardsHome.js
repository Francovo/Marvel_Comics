import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listarComicsActionAsincrono } from '../../actions/actionComics';
import '../../styles/CardsHome.scss';
import { useNavigate } from 'react-router-dom';
import { detallesActionAsincrono } from '../../actions/actionDetails';
import Modal from 'react-bootstrap/Modal';
import SpinnerLoading from '../spinner/SpinnerLoading';

const CardsHome = ({ InputText }) => {
	const dispatch = useDispatch();
	let navigate = useNavigate();

	//Set Data LocalStorage
	const [comicFavorite, setcomicFavorite] = useState(JSON.parse(window.localStorage.getItem('ComicsFav')) || []);

	//MODAL STATUS
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//OFFSET STATUS
	const [offset, setoffset] = useState(0);

	//BTN PAGINATION
	const moreComics = (num) => {
		setoffset(num + 10);
		handleShow();
		setTimeout(() => {
			dispatch(listarComicsActionAsincrono(num));
			setShow(false);
		}, 1000);
	};
	const lesComics = (num) => {
		setoffset(num - 10);
		handleShow();
		setTimeout(() => {
			dispatch(listarComicsActionAsincrono(num));
			setShow(false);
		}, 1000);
	};

	useEffect(() => {
		dispatch(listarComicsActionAsincrono(offset, InputText));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [offset, InputText]);

	const handleData = (comic) => {
		dispatch(detallesActionAsincrono(comic));
		handleShow();
		setTimeout(() => {
			navigate('/Detalles');
		}, 1000);
	};

	//añadir al local storage el comic fav
	const addFav = (ComicFav) => {
		let favoritos = JSON.parse(localStorage.getItem('ComicsFav'));
		if (favoritos) {
			const itemFound = favoritos.find((item) => item.id === ComicFav.id);
			if (itemFound) {
				localStorage.setItem('ComicsFav', JSON.stringify(favoritos.filter((item) => item.id !== ComicFav.id)));
				setcomicFavorite([...comicFavorite.filter((id) => id !== ComicFav.id)]);
				return;
			}
			favoritos.push(ComicFav);
			setcomicFavorite([...comicFavorite, ComicFav.id]);
			localStorage.setItem('ComicsFav', JSON.stringify(favoritos));
			return;
		}

		setcomicFavorite([...comicFavorite, ComicFav.id]);
		localStorage.setItem('ComicsFav', JSON.stringify([ComicFav]));
	};

	const { comics } = useSelector((store) => store.comics);

	return comics && comics.length ? (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Body>
					<SpinnerLoading />
				</Modal.Body>
			</Modal>
			<div className="ContainerbtnMore_leff">
				{offset > 0 && (
					<div className="Containerbtns">
						<button
							className="btn"
							onClick={() => {
								lesComics(offset);
							}}>
							⏪ LESS
						</button>
					</div>
				)}

				<div className="Containerbtns">
					<button
						className="btn"
						onClick={() => {
							moreComics(offset);
						}}>
						NEXT ⏩
					</button>
				</div>
			</div>
			<div className="Container_All_Cards">
				{comics.length !== 0 &&
					comics.map((comic, index) => (
						<div key={index} className="ContainerCard">
							{comic.images.length > 0 ? (
								<button
									className="BtnCard"
									onClick={() => {
										handleData(comic);
									}}>
									<img loading="lazy" alt="" src={`${comic.images[0].path}.${comic.images[0].extension}`} className="ImgCard" />
								</button>
							) : (
								<button
									className="BtnCard"
									onClick={() => {
										handleData(comic);
									}}>
									<img loading="lazy" src="https://www.cineycine.com/archivos/2016/07/marvel-portada.jpg" alt="" className="ImgCard" />
								</button>
							)}
							<div className="Title">{comic.title}</div>
							<button
								className={` ${comicFavorite.includes(comic.id) ? 'btn_active' : 'btnFav'}`}
								onClick={() => {
									const { id, images, title } = comic;
									addFav({ id, images, title });
								}}>
								⭐
							</button>
						</div>
					))}
			</div>
		</>
	) : (
		<div className="Container_All_Cards">
			<img src="https://www.iamrap.es/media/iamrap/images/2017/11/13/xv-8211-marvel-404.jpg" alt="" />
		</div>
	);
};

export default CardsHome;
