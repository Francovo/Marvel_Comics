import { types } from '../types/types';
import axios from 'axios';

axios.defaults.baseURL = 'http://gateway.marvel.com/v1/public';
const KEY = process.env.REACT_APP_APYKEY;
const KEY2 = process.env.REACT_APP_APYKEY2;

export const getData = async (offset) => {
	try {
		const data = await axios.get(`/comics?ts=1&limit=10&offset=${offset}${KEY2}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const listarComicsActionAsincrono = (offset) => {
	return async (dispatch) => {
		const data = await getData(offset);
		console.log('data action', data);
		dispatch(listarComicsActionSincrono(data.data.data.results));
	};
};

export const listarComicsActionSincrono = (data) => {
	return {
		type: types.listarComics,
		payload: data,
	};
};
