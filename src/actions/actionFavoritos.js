import axios from 'axios';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { types } from '../types/types';

axios.defaults.baseURL = 'http://gateway.marvel.com/v1/public';
const KEY2 = process.env.REACT_APP_APYKEY2;

// export const RegistroAsincronoFavoritos = (idComic) => {
// 	const data = {
// 		id: idComic,
// 	};
// 	return () => {
// 		console.log(data);
// 		addDoc(collection(db, 'fav'), { data });
// 	};
// };

// export const listarFavoritosAsincrono = () => (
// const listar = await getDocs(collection(db, 'fav'));
// let listarInfo = [];
// listar.forEach((element) => {
// 	listarInfo.push({ ...element.data() });
// });
// console.log(listarInfo[0].data.id);
// const data2 = await axios.get(`/comics/${listarInfo[0].data.id}?ts=1&limit=100&${KEY2}`);
// console.log(data2);
// if (data2) {
// 	dispatch(listarFavoritosSincrono(data2.data.data.results));
// } //PRUEBA
// );

export const listarFavoritosSincrono = (listarInfo) => {
	return {
		type: types.listarFavoritos,
		payload: listarInfo,
	};
};
