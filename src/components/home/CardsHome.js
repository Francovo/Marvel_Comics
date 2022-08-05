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

	const [show, setShow] = useState(false);

	//MODAL STATUS
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//OFFSET STATUS
	const [offset, setoffset] = useState(0);

	//BTN PAGINATION
	const moreComics = (num) => {
		setoffset(num + 10);
		dispatch(listarComicsActionAsincrono(num));
	};
	const lesComics = (num) => {
		setoffset(num - 10);
		dispatch(listarComicsActionAsincrono(num));
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
			favoritos.push(ComicFav);
			localStorage.setItem('ComicsFav', JSON.stringify(favoritos));
		} else {
			localStorage.setItem('ComicsFav', JSON.stringify([ComicFav]));
		}

		dispatch(listarComicsActionAsincrono(offset, InputText));
	};

	const isFav = (id) => {
		let comics = JSON.parse(localStorage.getItem('ComicsFav'));
		if (!comics) {
			return null;
		} else if (comics.find((comic) => comic.id === id)) {
			return true;
		} else {
			return false;
		}
	};

	const { comics } = useSelector((store) => store.comics);
	return (
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
						<div to="/Detalles" key={index} className="ContainerCard">
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
								className={`btnFav ${isFav(comic.id) ? 'btn_active' : ''}`}
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
	);
};

export default CardsHome;
