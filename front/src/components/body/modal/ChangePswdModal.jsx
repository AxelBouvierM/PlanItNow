import styled from "styled-components";
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { React, useState } from 'react';
import { RiErrorWarningLine, RiCheckLine } from 'react-icons/ri';

const modalTransition = { type: "spring", stiffness: 100 };

const Overlay = styled.div`
    transition: all 400ms ease-in-out;
`;

const ModalContainer = styled(motion.div)`
  display: block;
  position: fixed;
  border: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fafafa;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 1);
  border-radius: 20px;
  z-index: 4;
`;

const Icon = styled.i`
  vertical-align: middle;
  margin: 0 0.4em 0 0;
`;

const FormContainer = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 85%;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: auto;
  padding: 1em;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #000;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: block;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 3em;
  border: none;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.20);
  color: #fafafa;
  padding-left: 1.5em;
  margin: auto;
  &:focus {
    outline: none;
	transition: all 200ms ease-in-out;
    &::placeholder {
      opacity: 0;
      overflow: auto;
    }
  }
  // in bar text color.
  &::placeholder {
    color: #fafafa;
    transition: all 200ms ease-in-out;
  }
`;

const Button = styled.button`
	display: block;
	position: relative;
	width: 100%;
	height: 3em;
	align-items: center;
	justify-content: center;
	padding:0.20em 1.2em;
	border:0.1em solid #FFFFFF;
	border-radius:0.12em;
	box-sizing: border-box;
	text-decoration:none;
	font-family:'Roboto',sans-serif;
	font-weight:350;
	color: #fafafa;
	font-size: 1em;
	background-color: #000;
	transition: all 0.2s;
	text-align: center;
	margin-top: 1em;
	border-bottom-right-radius: 20px;
	border-bottom-left-radius: 20px;
	cursor: pointer;
	&:hover {
		color: #000;
		background-color: #fafafa;
	}
`

const CloseIcon = styled(motion.span)`
  color: black;
  position: relative;
  width: fit-content;
  font-size: 2em;
  vertical-align: middle;
  margin-top: -95px;
  padding: 1px;
  margin-left: 480px;
  transition: all 400ms ease-in-out;
  cursor: pointer;
`;

const Cambio = styled.label`
  display: block;
  width: 100%;
  font-size: 0.9em;
  font-weight: 400;
  color: green;
  margin: 1em;
  text-align: center;
`;

const PassRequest = styled.label`
  display: block;
  width: 100%;
  font-size: 0.9em;
  font-weight: 400;
  color: crimson;
  margin: 0.5em;
  text-align: center;
`;

const ChangePwsdModal = ({ open, close }) => {
	const [correctRegister, setCorrectRegister] = useState(false);
	const [passError, setPassError] = useState('');
	const [oldPassword, setActualPass] = useState('');
	const [password, setPass] = useState('');
	const [newPassword, setNewPass] = useState('');
	
	// post password into base.py
	async function SendNewPassword(event) {
		event.preventDefault()
		const headers = {
			'Content-Type': 'application/json',
			'Content-Encoding': 'gzip, deflate, br',
		};

		const pwdData = {
			'oldPassword': oldPassword,
			'newPassword': newPassword
		}
		if (newPassword === '') {
			setPassError('Ingresa una nueva contraseña válida');
			return;
		}
		const res = await axios.post('/newPWD', pwdData, { headers: headers })
			.catch((err) => {
				console.log(err);
			});
			console.log(res);
		if (res.data.response.status === 'Ok') setCorrectRegister(true);
		else if (res.data.response.status === 'Old password invalid') setPassError('Contraseña incorrecta')
		else setPassError('Ha ocurrido un error, vuelve a intentarlo');
	}

	// chequea que cumpla los requisitos
	function checkPassRequirements(string) {
		const intMatch = string.match(/\d+/g);
		const upperMatch = string.match(/[A-Z]/);

		if (string.length >= 6 && intMatch != null && upperMatch != null) {
			setPassError(null);
			return true;
		} else if (string.length < 6) {
			setPassError('La contraseña debe tener al menos 6 caracteres.');
		} else if (intMatch == null) {
			setPassError('La contraseña debe tener al menos 1 número.');
		} else if (upperMatch == null) {
			setPassError('La contraseña debe tener al menos 1 mayúscula.');
		} else {
			setPassError('Ha ocurrido un error, vuelve a intentarlo');
		}
	}

	function checkCoincidence(string) {
		if (string === password) return true;
		else return false;
	}

	if (!open) return null;

	return (
		<>
			<Overlay>
				<ModalContainer 
					initial={{ opacity: 0 }} 
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={modalTransition}>
					<CloseIcon
						key="close-icon"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={close}
						transition={{ duration: 0.2 }}
					>
						<IoClose />
					</CloseIcon>
					<Title>Cambiar contraseña</Title>
					<FormContainer onSubmit={SendNewPassword}>
						<InputContainer>
							<Input
								type="password"
								className="loginInput"
								placeholder="Contraseña actual"
								onChange={(event) => {
									setActualPass(event.target.value);
								}}
								required>
							</Input>
						</InputContainer>
						<InputContainer>
							<Input
								type="password"
								className="loginInput"
								placeholder="Nueva Contraseña"
								onChange={(event) => {
									if (checkPassRequirements(event.target.value)) setPass(event.target.value)
								}}
								required>
							</Input>
						</InputContainer>
						<InputContainer>
							<Input
								type="password"
								placeholder="Confirma tu contraseña"
								onChange={(event) => {
									setPassError('')
									if (checkCoincidence(event.target.value) && checkPassRequirements(event.target.value)) {
										setPassError('');
										setNewPass(event.target.value);
									} else if (!checkPassRequirements(event.target.value)) {
										setPassError('La contraseña no cumple los requisitos');
									} else if (!checkCoincidence(event.target.value)) {
										setPassError('Las contraseñas no coinciden');
									}
								}}
								required>
							</Input>
						</InputContainer>
						{passError && !correctRegister && (<PassRequest><Icon><RiErrorWarningLine /></Icon>{passError}</PassRequest>)}
						{correctRegister && <Cambio><Icon><RiCheckLine /></Icon>La contraseña se ha modificado correctamente!</Cambio>}
						<Button type="submit" >Confirmar</Button>
					</FormContainer>
				</ModalContainer>
			</Overlay>
		</>
	);
};
export default ChangePwsdModal;
