import { types } from '../types/types';

const initialstate = { details: {} };

export const detailsReducer = (estadoinicial = initialstate, action) => {
	switch (action.type) {
		case types.detalles:
			return {
				comicDetail: [action.payload],
			};
		default:
			return estadoinicial;
	}
};
