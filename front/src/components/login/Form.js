import { useState } from 'react';
import APIService from './APIService'

const Form = (props) => {
	const [username, setUser] = useState('')
	const [password, setPass] = useState('')

	const sendInput = () => {
		APIService.SendUserInput({ username, password })
			.then((response) => props.insertedArticle(response))
			.catch(error => console.log('error', error))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		sendInput()
		// clears the form fields after submission.
		setUser('')
		setPass('')
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>

				<label htmlFor="username" className="form-label">Usuario</label>
				<input
					type="text"
					className="form-control"
					placeholder="Usuario"
					value={username}
					onChange={(e) => setUser(e.target.value)}
					required
				/>
				<label htmlFor="password" className="form-label">Contraseña</label>
				<input
					className="form-control"
					placeholder="Contraseña"
					rows='6'
					value={password}
					onChange={(e) => setPass(e.target.value)}
					required>
				</input>
				<button className="btn btn-primary mt-2">Entrar</button>

			</form>
		</div>
	)
}

export default Form;
