import { types } from '../types/types';
import axios from 'axios';

const KEY = process.env.REACT_APP_APYKEY;
const KEY2 = process.env.REACT_APP_APYKEY2;

export const getData = async (offset, InputText) => {
	try {
		if (InputText.length > 1) {
			const data2 = await axios.get(`/comics?ts=1&limit=10&offset=${offset}&titleStartsWith=${InputText}${KEY}`);
			return data2;
		} else {
			const data = await axios.get(`/comics?ts=1&limit=10&offset=${offset}${KEY}`);
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const listarComicsActionAsincrono = (offset, InputText) => {
	return async (dispatch) => {
		const data = await getData(offset, InputText);
		dispatch(listarComicsActionSincrono(data.data.data.results));
	};
};

export const listarComicsActionSincrono = (data) => {
	return {
		type: types.listarComics,
		payload: data,
	};
};
