import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { comicReducer } from '../reducers/comicReducer';
import { detailsReducer } from '../reducers/detailsReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
	comics: comicReducer,
	details: detailsReducer,
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
