import { React, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Outlet, Link, useNavigate} from 'react-router-dom';

import registerBg from '../images/registerBg.jpg'
import { IconContext } from "react-icons";
import { RiArrowLeftLine, RiArrowRightLine, RiErrorWarningLine, RiCheckLine } from 'react-icons/ri';
import MoonLoader from 'react-spinners/MoonLoader';

import logo from '../images/pinLogoEstirado.png'

const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${registerBg});
  background-repeat: no-repeat;
    background-size: cover;
      width: 100vw;
  height: 100vh;
`;

const LogoContainer = styled.div`
	display: flex;
	position: fixed;
  bottom: 0;
  opacity: 0.7;
	margin: 3rem 3rem;;
`;

const Logo = styled.img`
	max-width: 10em;
	max-height: 10em;
	height: fit-content;
	opacity: 1;
	transition: 0.6s ease-in-out;
	&:hover {
		transform: translateX(1em);
		transition: 0.6s ease-in-out;
	}
`;

const GoBackContainer = styled.a`
  display: flex;
	position: absolute;
	width: 100vw;
  padding: 3rem;
`;

const Text = styled.p`
	display: flex;
	position: fixed;
  width: 40%;
  bottom: 8%;
  color: #fafafa;
  font-size: 2.5em;
	margin: 3rem 3rem;;
`;


const GoBackButton = styled.a`
  display:inline-block;
  padding:0.35em 1.2em;
  border:0.1em solid #FFFFFF;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  text-align:center;
  transition: all 0.2s;
  background-color: transparent;
  font-size: 0.9em;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
`;

const RegisterContainer = styled.div`
  display: flex;
  position: absolute;
  width: 45%;
  height: 100vh;
  background-color: transparent;
  border-left: 3px solid #fafafa;
  align-items: center;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.20);
  backdrop-filter: blur(15px);
  top:0;
  bottom: 0;
  right: 0;
  margin: auto;
`;

const TextSpace = styled.h1`
  margin-bottom: 3em;
  font-size: 2.5vw;
  color: #fafafa;
`;

const FormContainer = styled.form`
  width: 100%;
  min-height: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const InputContainer = styled.div`
  width: 60%;
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

const PassReq = styled.label`
  display: block;
  width: 100%;
  font-size: 0.9em;
  font-weight: 400;
  color: crimson;
  margin: 1em;
  text-align: center;
`;

const Registered = styled.label`
  display: block;
  width: 100%;
  font-size: 0.9em;
  font-weight: 400;
  color: green;
  margin: 1em;
  text-align: center;
`;

const DataContainer = styled.div`
  width: 100%;
  display: inline;
  position: relative;
  text-align: center;
  vertical-align: middle;
  gap: 2em;
`;

const ButtonStyle = styled.button`
  display:inline-block;
  margin: 1em 1em;
  padding:0.35em 1.2em;
  border:0.1em solid #FFFFFF;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:350;
  color:#FFFFFF;
  background-color: transparent;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
`;

const Icon = styled.i`
  vertical-align: middle;
  margin: 0.4em;
`;

const LoginText = styled.a`
  color: #D8D8D8;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.8em;
  transition: 0.3s ease-in-out;
  &:hover {
	color: white;
  transition: 0.3s ease-in-out;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1em;
`;

const ErrorWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
  background-color: rgba(230,0,0,0.5);
  text-align: center;
`;

const ErrorMessage = styled.p`
  font-size: 0.9em;
  font-weight: 350;
  color: white;
  padding: 0.3em;
  text-transform: uppercase;
`;

function Register() {
	const [username, setUser] = useState('')
	const [mail, setMail] = useState('')
	const [password, setPass] = useState('')
  const [isLoading, setLoading] = useState(false);
  const [Error, setError] = useState('');
  const [passError, setPassError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [nicePassword, setNicePassword] = useState(false);
  const [correctRegister, setCorrectRegister] = useState(false);
  const navigate = useNavigate();

  function checkPassRequirements(string) {
    const intMatch = string.match(/\d+/g);
    const upperMatch = string.match(/[A-Z]/);

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

  async function SendFormInput(event) {
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

    setLoading(true);

    const res = await axios.post('/register', regData, { headers: headers })
    .catch((err) => {
        console.log(err);
    });

    if (res.data.response.status === 'Ok') {
      setCorrectRegister(true);
      setTimeout(() => setRedirect(true), 1500)

    } else if (res.data.response.status === 'User already exists') {
      setError('Este nombre de usuario ya esta en uso');
    } else if (res.data.response.status === 'Mail already exists') {
      setError('Ya existe una cuenta asociada con este correo');
    } else if (res.data.response.status === 'Invalid user') {
      setError('El nombre de usuario debe tener al menos 6 caracteres');
    } else if (res.data.response.status === 'Please complete all the data') {
      setError('La contraseña no cumple los requisitos');
    } else {
      setError('Ha ocurrido un error, vuelve a intentarlo');
    }
    setLoading(false);
  };

  if (redirect) navigate('/ingresar');

	return (
		<Background>
      <GoBackContainer>
        <Link to="/" className='linkStyle'>
          <GoBackButton type="button" className='button-hover'><Icon><RiArrowLeftLine style={{ verticalAlign: 'middle', marginBottom: '0.2em' }} /></Icon>Volver</GoBackButton>
        </Link>
        <Outlet />
      </GoBackContainer>
      <LogoContainer><Logo src={logo}></Logo></LogoContainer>
      <Text>¡Crea tu cuenta para conocer nuevos lugares!</Text>
      <RegisterContainer>
        <FormContainer onSubmit={SendFormInput}>
          <TextSpace>REGÍSTRATE</TextSpace>
          {Error && (
            <ErrorWrapper>
              <ErrorMessage><Icon><RiErrorWarningLine /></Icon>{Error}</ErrorMessage>
            </ErrorWrapper>
          )}
          <InputContainer>
            <Input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(event) => setUser(event.target.value)}
              required>
            </Input>
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="Email"
              value={mail}
              onChange={(event) => setMail(event.target.value)}
              required>
            </Input>
          </InputContainer>
          <InputContainer>
            <Input
            type="password"
            placeholder="Contraseña"
            onChange={(event) => {
              checkPassRequirements(event.target.value)
              if (nicePassword) setPass(event.target.value)
              }}
            required>
            </Input>
          </InputContainer>
          {passError && !correctRegister && (<PassReq><Icon><RiErrorWarningLine /></Icon>{passError}</PassReq>)}
          {correctRegister && <Registered><Icon><RiCheckLine /></Icon>Te has registrado correctamente!</Registered>}
          <DataContainer>
            <ButtonStyle type="submit">
              <Icon>
                <IconContext.Provider value={{
                  style: { verticalAlign: 'middle' },
                  className: 'enter',
                  size: '1.4em'
                }}>
                  <RiArrowRightLine />
                </IconContext.Provider>
              </Icon>
            </ButtonStyle>
            <Link to="/ingresar">
              <LoginText>¿Ya tienes una cuenta?</LoginText>
            </Link>
            <Outlet />
            {isLoading && (
              <LoadingWrapper>
                <MoonLoader loading color="white" size={20} />
              </LoadingWrapper>
            )}
          </DataContainer>
        </FormContainer>
      </RegisterContainer>
		</Background>
	);
}

export default Register;
