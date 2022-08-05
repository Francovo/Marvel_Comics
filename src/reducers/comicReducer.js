import { types } from '../types/types';

const initialstate = { comics: [] };

export const comicReducer = (estadoinicial = initialstate, action) => {
	switch (action.type) {
		case types.listarComics:
			return {
				comics: [...action.payload],
			};
		default:
			return estadoinicial;
	}
};
