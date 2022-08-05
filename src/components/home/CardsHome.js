import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, lesComics, listarComicsActionAsincrono, moreComics } from '../../actions/actionComics';
import '../../styles/CardsHome.scss';
import { useNavigate } from 'react-router-dom';
import { detallesActionAsincrono } from '../../actions/actionDetails';
import Modal from 'react-bootstrap/Modal';
import SpinnerLoading from '../spinner/SpinnerLoading';

const CardsHome = () => {
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [offset, setoffset] = useState(0);

	const moreComics = (num) => {
		setoffset(num + 10);
		console.log(num);
		dispatch(listarComicsActionAsincrono(num));
	};
	const lesComics = (num) => {
		setoffset(num - 10);
		console.log(num);
		dispatch(listarComicsActionAsincrono(num));
	};

	useEffect(() => {
		dispatch(listarComicsActionAsincrono(offset));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [offset]);

	const handleData = (comic) => {
		dispatch(detallesActionAsincrono(comic));
		handleShow();
		setTimeout(() => {
			navigate('/Detalles');
		}, 1000);
	};

	const { comics } = useSelector((store) => store.comics);
	console.log(comics);
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Body>
					<SpinnerLoading />
				</Modal.Body>
			</Modal>
			<div className="Containerbtn">
				<div className="btnMore">
					<button
						onClick={() => {
							lesComics(offset);
						}}>
						Less
					</button>
				</div>
				<div className="btnMore">
					<button
						onClick={() => {
							moreComics(offset);
						}}>
						More
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
						</div>
					))}
			</div>
		</>
	);
};

export default CardsHome;
