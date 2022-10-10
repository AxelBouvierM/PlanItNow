import { useState } from 'react'
import axios from 'axios'
//import axios from "axios";

function Login() {
	const [username, setUser] = useState('')
	const [password, setPass] = useState('')
	
	async function SendFormInput(event) {
		event.preventDefault()
		const headers = {
			'Content-Type': 'application/json',
			'Content-Encoding': 'gzip, deflate, br',
		};

		const formData = {
			'username': username,
			'password': password
		};

		axios.post('/login/auth', formData, { headers: headers })
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<form onSubmit={SendFormInput}>

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
	);
}

export default Login;
