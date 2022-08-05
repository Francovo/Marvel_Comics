import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/Detalles.scss';

const Detalles = () => {
	const { comicDetail } = useSelector((store) => store.details);

	console.log('urlImage', comicDetail[0]);

	let navigate = useNavigate();
	return (
		<>
			<div className="ContainerDetails">
				<button
					className="BtnBack"
					onClick={() => {
						navigate('/');
					}}>
					⇍
				</button>
				<img src={comicDetail[0].img} alt="" />
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
