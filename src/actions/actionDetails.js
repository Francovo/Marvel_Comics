import axios from 'axios';
import { types } from '../types/types';

axios.defaults.baseURL = 'https://gateway.marvel.com/v1/public';
const KEY = process.env.REACT_APP_APYKEY;
// const KEY2 = process.env.REACT_APP_APYKEY2;

const img = async (characters) => {
	console.log(characters);
	if (!characters.length) {
		return [];
	}
	const promise = characters.map(async (char) => {
		console.log(char);
		const data = await axios.get(`${char.resourceURI.replace('http', 'https')}?ts=1${KEY}`);
		const urlimg = data.data.data.results[0].thumbnail.path;
		return urlimg.replace('http', 'https');
	});
	const charDetails = await Promise.all(promise);
	return charDetails;
};

const DataDetail = async (comic) => {
	const detailcomic = {
		img: `${comic.images[0]?.path}.${comic.images[0]?.extension}`,
		characters: comic.characters.items,
		details: comic.description,
	};
	detailcomic.characters = await img(detailcomic.characters);
	return detailcomic;
};

export const detallesActionAsincrono = (comic) => {
	return async (dispatch) => {
		const data = await DataDetail(comic);
		dispatch(detallesActionSincrono(data));
	};
};

export const detallesActionSincrono = (data) => {
	return {
		type: types.detalles,
		payload: data,
	};
};
