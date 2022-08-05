import axios from 'axios';
import { types } from '../types/types';

axios.defaults.baseURL = 'https://gateway.marvel.com/v1/public';
const KEY = process.env.REACT_APP_APYKEY;
// const KEY2 = process.env.REACT_APP_APYKEY2;

const img = (characters) => {
	const charImage = [];
	characters.map(async (char) => {
		const data = await axios.get(`${char.resourceURI}?ts=1${KEY}`);
		const urlimg = data.data.data.results[0].thumbnail.path;
		charImage.push(urlimg);
	});
	return charImage;
};

const DataDetail = (comic) => {
	const detailcomic = {
		img: `${comic.images[0]?.path}.${comic.images[0]?.extension}`,
		characters: comic.characters.items,
		details: comic.description,
	};
	detailcomic.characters = img(detailcomic.characters);
	return detailcomic;
};

export const detallesActionAsincrono = (comic) => {
	return (dispatch) => {
		const data = DataDetail(comic);
		dispatch(detallesActionSincrono(data));
	};
};

export const detallesActionSincrono = (data) => {
	return {
		type: types.detalles,
		payload: data,
	};
};
