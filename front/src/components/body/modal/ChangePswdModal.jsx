import styled from "styled-components";
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { React, useEffect, useState } from 'react';
import { RiErrorWarningLine, RiCheckLine } from 'react-icons/ri';



const Overlay = styled.div`
    transition: all 400ms ease-in-out;
`;

const ModalContainer = styled.div`
  margin: auto;
  display: block;
  position: fixed;
  max-height: 50vh;
  height: 100%;
  max-width: 40vw;
  width: 100%;
  text-align: center;
  top: -40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  border-radius: 40px;
  border: solid;
  border-color: #fafafa;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.20);
  backdrop-filter: blur(20px);
  margin: 0 1em 0 1em;
  @media screen and (max-width:1279px) {
    	& {
     	max-width: 90vw;
			max-height: 85vh;
    	}
  	}
  @media screen and (max-width:300px) {
    	& {
     	max-width: 90vw;
			max-height: 80vh;
    	}
  	}
`;

const Icon = styled.i`
  vertical-align: middle;
  margin: 0 0.4em 0 0;
`;

const InputContainer = styled.div`
  width: 18em;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  padding-bottom: 2em;
  margin: auto;
`;
const InputContainer2 = styled.div`
  width: 18em;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  padding-bottom: 1.0em;
  margin: auto;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 3em;
  border: none;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.20);
  color: #fafafa;
  padding-left: 6.5em;

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
  display:inline-block; 
  background-color: #cde3f6;
	font-size: 21px;
  font-weight:350;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
	width: 200px;
  color:#9dd0e4;
	text-align: center;
	margin: auto;
	border-radius: 50px;
  border:0.1em solid #FFFFFF;
  border: none;
	cursor: pointer;
  box-shadow: 0px 0px 2px 2px rgb(0,0,0);
  background-color: transparent;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
}
`


const CloseIcon = styled(motion.span)`
  color: black;
  font-size: 2em;
  vertical-align: middle;
  margin-top: -95px;
  padding-bottom: 1px;
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

	const [data, setData] = useState([]);
	const [correctRegister, setCorrectRegister] = useState(false);
	const [nicePassword, setNicePassword] = useState(false);
	const [passError, setPassError] = useState('');
	const [password, setPass] = useState('');
	const [newPassword, setNewPass] = useState('');

	// get old password to compare to the one we ask
	useEffect(() => {
		axios.get('/newPWD')
			.then((res) => {
				const values = Object.values(res.data)
				setData(values)
			})
			.catch((err) => {
				console.log(err)
			});
	}, [])

	// post password into base.py
	async function SendNewPassword(event) {
		event.preventDefault()
		const headers = {
			'Content-Type': 'application/json',
			'Content-Encoding': 'gzip, deflate, br',
		};

		const pwdData = {
			'password': password,
			'newPassword': newPassword

		}
		const res = await axios.post('/newPWD', pwdData, { headers: headers }).catch((err) => {
			console.log("Error: ", err);
		});
		if (res.data.response.status === 'Ok') {
			setCorrectRegister(true);
		}

	}

	// get the password writen and compares it with old password.
	/*const handlePswd = (event) => {
	  const searchPswd = event.target.value;
	  setPswdEntered(searchPswd);
  
	  const getOldPwsd = data.filter((value) => {
		  return value.oldPassword();
	  });
  
	  if (searchPswd === getOldPwsd) {
		  return ("");
	  } else {
		  return ("Password doesn't match");
	  }
	};*/

	// post new password

	/*const newPassword = (event) => {
	  const getNewPswd = event.target.value;
	  setNewPswd(getNewPswd);
  
	};*/

	// chequea que cumpla los requisitos
	function checkPassRequirements(string) {
		const intMatch = string.match(/\d+/g);
		const upperMatch = string.match(/[A-Z]/);

		setNicePassword(false);
		if (string.length >= 6 && intMatch != null && upperMatch != null) {
			setPassError(null);
			setNicePassword(true);
		} else if (string.length < 6) {
			setPassError('La contraseña debe tener al menos 6 caracteres.');
			setNicePassword(false);
		} else if (intMatch == null) {
			setPassError('La contraseña debe tener al menos 1 número.');
			setNicePassword(false);
		} else if (upperMatch == null) {
			setPassError('La contraseña debe tener al menos 1 mayúscula.');
			setNicePassword(false);
		} else {
			setPassError('Ha ocurrido un error, vuelve a intentarlo');
		}
	}


	if (!open) return null;

	return (
		<>
			<Overlay>
				<ModalContainer onSubmit={SendNewPassword}>
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
					<InputContainer>
						<Input
							type="password"
							placeholder="Contraseña Actual"
							onChange={(event) => {
								checkPassRequirements(event.target.value)
								if (nicePassword) setPass(event.target.value)
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
								checkPassRequirements(event.target.value)
								if (nicePassword) setNewPass(event.target.value)
							}}
							required>
						</Input>
					</InputContainer>
					<InputContainer2>
						<Input
							type="password"
							placeholder="Nueva Contraseña"
							onChange={(event) => {
								checkPassRequirements(event.target.value)
								if (nicePassword) setNewPass(event.target.value)
							}}
							required>
						</Input>
					</InputContainer2>
					{passError && !correctRegister && (<PassRequest><Icon><RiErrorWarningLine /></Icon>{passError}</PassRequest>)}
					{correctRegister && <Cambio><Icon><RiCheckLine /></Icon>La contraseña see ha cambiado correctamente!</Cambio>}
					<Button type="submit">Confirmar</Button>
				</ModalContainer>
			</Overlay>
		</>
	);
};
export default ChangePwsdModal;
