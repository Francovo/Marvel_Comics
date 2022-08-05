import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RegistroAsincrono } from '../../actions/actionRegistro';

export const Registro = () => {
	const dispatch = useDispatch();
	const formRef = useRef(null);

	const [registro, setRegistro] = useState({
		nombre: '',
		email: '',
		pass1: '',
		pass2: '',
	});

	const { nombre, email, pass1, pass2 } = registro;

	const handleInputChange = ({ target }) => {
		setRegistro({
			...registro,
			[target.name]: target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(RegistroAsincrono(email, pass1, nombre));
		formRef.current.email.value = '';
		formRef.current.pass1.value = '';
		formRef.current.pass2.value = '';
	};

	const [showPassword, setShowPassword] = useState(false);

	const handleShowClick = () => setShowPassword(!showPassword);

	return (
		<div className="ContainerAll">
			<div class="row p-5">
				<div
					id="login"
					class="col-lg-4 offset-lg-4 col-md-6 offset-md-3
                    col-12">
					<h2 class="text-center">Bienvenido de nuevo</h2>
					<img
						class="img-fluid mx-auto d-block rounded p-3"
						src="https://yt3.ggpht.com/ytc/AMLnZu8pJTWJOEFHyPsqCcU50Z7J6CBNh-GtIrK__FQRGg=s900-c-k-c0x00ffffff-no-rj"
						alt=""
						style={{ width: '300px' }}
					/>

					<form onSubmit={handleSubmit} ref={formRef}>
						<div class="form-group">
							<label for="correo">Correo</label>
							<input name="email" value={email} onChange={handleInputChange} class="form-control" type="email" placeholder="Correo electrónico" />
						</div>
						<div class="form-group">
							<label>Contraseña</label>
							<div class="d-flex">
								<input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" class="form-control" name="pass1" minLength={6} value={pass1} onChange={handleInputChange} />
								<button onClick={handleShowClick} className="mostrarContraseña">
									{showPassword ? '❌' : '👁'}
								</button>
							</div>
						</div>
						<div class="form-group">
							<label>Contraseña</label>
							<div class="d-flex">
								<input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" class="form-control" name="pass2" minLength={6} value={pass2} onChange={handleInputChange} />
							</div>
						</div>

						<div style={{ display: 'flex', gap: '1rem' }}>
							<button variant="primary" type="submit" class="btn btn-primary mb-2 mt-2">
								Registrarse
							</button>

							<Link to="/login" type="button" class="btn btn-light mb-2 mt-2">
								Login
							</Link>
						</div>

						<br />
					</form>
				</div>
			</div>
		</div>
	);
};
