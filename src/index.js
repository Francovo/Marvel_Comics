import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouters from './routers/AppRouters';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.querySelector('#root')).render(
	<Provider store={store}>
		<body className="bg-dark">
			<AppRouters />
		</body>
	</Provider>
);
