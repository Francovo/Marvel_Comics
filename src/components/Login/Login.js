import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginEmailPassAsincrono, loginGoogleAsincrono } from '../../actions/actionLogin';
import { useDispatch } from 'react-redux';

function Login() {
	const dispatch = useDispatch();

	const formRef = useRef(null);

	const navigate = useNavigate();

	const [userLogged, setuserLogged] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginEmailPassAsincrono(formRef.current.email.value, formRef.current.password.value, setuserLogged));
	};

	const handleGoogleAsincrono = () => {
		dispatch(loginGoogleAsincrono());
	};

	if (userLogged) {
		navigate('/');
	} else {
		return (
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
							<input name="email" class="form-control" type="email" placeholder="Correo electrónico" />
						</div>
						<div class="form-group">
							<label for="palabraSecreta">Contraseña</label>
							<input type="password" placeholder="Contraseña" class="form-control" name="password" minLength={6} />
						</div>
						<div style={{ display: 'flex', gap: '1rem' }}>
							<button type="submit" class="btn btn-primary mb-2 mt-2 ">
								Entrar
							</button>
							<Link to="/registro" className="btn btn-light mb-2 mt-2">
								Registrarse
							</Link>
							<div className="google" onClick={() => handleGoogleAsincrono()} class="mt-3" type="button">
								<div className="google-icon-wrapper">
									<img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
								</div>
							</div>
						</div>

						<br />
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
