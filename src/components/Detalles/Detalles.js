import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/Detalles.scss';

const Detalles = () => {
	const { comicDetail } = useSelector((store) => store.details);

	console.log('urlImage', comicDetail[0]);

	return (
		<div>
			<img src={comicDetail[0].img} alt="" />
			{comicDetail[0].details.length > 0 ? <h1 className="ComicDetails">{comicDetail[0].details}</h1> : <h1 className="ComicDetails">NO DISPONIBLE 🔍</h1>}

			{comicDetail[0].characters &&
				comicDetail[0].characters.map((char, index) => (
					<div key={index}>
						<img src={`${char}.jpg`} alt="" />
						<label> {char.name}</label>
					</div>
				))}
		</div>
	);
};

export default Detalles;
