import { useState } from 'react'
import axios from 'axios'
//import axios from "axios";

function Register() {
	const [username, setUser] = useState('')
	const [mail, setMail] = useState('')
	const [password, setPass] = useState('')

	function SendFormInput(event) {
		event.preventDefault()
		const headers = {
			'Content-Type': 'application/json',
			'Content-Encoding': 'gzip, deflate, br',
		};

		const regData = {
			'username': username,
			'mail': mail,
			'password': password
		};

		axios.post('/register', regData, { headers: headers })
			.then((res) => {
				console.log(res);
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
				<label htmlFor="mail" className="form-label">Mail</label>
				<input
					type="text"
					className="loginInput"
					placeholder="Mail"
					value={mail}
					onChange={(event) => setMail(event.target.value)}
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
				<button type="submit" className="btn btn-primary mt-2">Registrarme</button>
			</form>
		</div>
	);
}

export default Register;
