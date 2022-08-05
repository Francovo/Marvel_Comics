import CardsHome from './CardsHome';
import '../../styles/Home.scss';

export const Home = () => {
	return (
		<div className="Container_Home">
			<div className="Container_Search_Comic">
				<input placeholder="Busca un Comic o Personaje" className="InputSearch"></input>
			</div>
			<div className="Container_Card">
				<CardsHome />
			</div>
		</div>
	);
};
