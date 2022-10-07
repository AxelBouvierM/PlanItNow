import { useState } from 'react';

const Form = () => {
	const [username, setUser] = useState('')
	const [password, setPass] = useState('')

	const sendInput = () => {
		const formData = {
			'username': username,
			'password': password
		};
		ApiMethods.SendFormInput(formData);
		event.preventDefault();
		// clear from fields
		setUser('');
		setPass('');
	};


	return (
		<div>
			<form onSubmit={sendInput}>

				<label htmlFor="username" className="form-label">Usuario</label>
				<input
					type="text"
					className="loginInput"
					placeholder="Usuario"
					value={username}
					onChange={(event) => setUser(event.target.value)}
					required>
					</input>
				<label htmlFor="password" className="form-label">Contraseña</label>
				<input
					type="password"
					className="loginInput"
					placeholder="Contraseña"
					value={password}
					onChange={(event) => setPass(event.target.value)}
					required>
				</input>
				<button type="submit" className="btn btn-primary mt-2">Entrar</button>
			</form>
		</div>
	)
}

export default Form;
