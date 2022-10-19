import { React, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import montaña4 from '../images/montaña4.jpg'

import { IconContext } from "react-icons";
import { RiArrowLeftLine, RiArrowRightLine, RiErrorWarningLine } from 'react-icons/ri';
import MoonLoader from 'react-spinners/MoonLoader';

const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${montaña4});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 55%;
  height: 100%;
`;

const GoBackButton = styled.button`
  width: 6em;
  height: 2.5em;
  display: flex;
  align-items: center;
  position: absolute;
  margin-top: 2em;
  margin-left: 2em;
  gap: 0.5em;
  border: none;
  border-bottom: solid 3px;
  border-color: #fafafa;
  color: #fafafa;
  background-color: transparent;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.20);
  backdrop-filter: blur(15px);
  justify-content: center;
  cursor: pointer;
  &:hover {
	background-color: crimson;
  transition: 0.3s ease-in-out;
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
  display: flex;
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

const DataContainer = styled.div`
  width: 100%;
  display: inline;
  position: relative;
  text-align: center;
  vertical-align: middle;
  gap: 2em;
`;

const ButtonStyle = styled.button`
  width: 2.5em;
  height: 2.5em;
  display: inline-block;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  border-radius: 20px;
  border: none;
  border-color: #fafafa;
  color: white;
  font-size: 16px;
  vertical-align: middle;
  margin-right: 1.5em;
  cursor: pointer;
  &:hover {
	background-color: crimson;
  transition: 0.3s ease-in-out;
  }
`;

const Icon = styled.i`
  vertical-align: middle;
  margin: 0 0.4em;
`;

const LoginText = styled.a`
  color: #fafafa;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.8em;
  &:hover {
	color: crimson;
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
  width: 55%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 2em;
  background-color: rgba(230,0,0,0.8);

`;

const ErrorMessage = styled.p`
  font-size: 1em;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
`;

const ReqContainer = styled.div`
  display: inline-block;
  font-size: 1em;
  font-weight: 350;
  color: white;
  margin-bottom: 0.8em;
`;

const PassRequirement = styled.div`
  display: inline-block;
  font-size: 0.8em;
  font-weight: 350;
  color: white;
  margin-bottom: 0.8em;
`;

function Register() {
	const [username, setUser] = useState('')
	const [mail, setMail] = useState('')
	const [password, setPass] = useState('')
  const [isLoading, setLoading] = useState(false);
  const [LoginRedirect, setLoginRedirect] = useState(false)
  const [Error, setError] = useState('');

  const [numberCheck, setNumbersCheck] = useState(false);
  const [upperCheck, setUpperCheck] = useState(false);
  const [lengthCheck, setLengthCheck] = useState(false);
  const [passDetails, showPassDetails] = useState(false);

  const navigate = useNavigate();

  function checkForNumbers(string){
    const matches = string.match(/\d+/g);
    if (matches != null) setNumbersCheck(true);
  };

  function checkForUpperCase(string){
    const matches = string.match(/[A-Z]/);
    if (matches != null) setUpperCheck(true);
  };

  function checkForLength(string) {
    if (string.length >= 6) setLengthCheck(true)
  };

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
    console.log('Cargando?', isLoading);

    const res = await axios.post('/register', regData, { headers: headers }).catch((err) => {
      console.log("Error: ", err);
    });

    if (res.data.response.status === 'Ok') {
      // crear msj de Cuenta creada correctamente y redireccion segundos despues.
      setLoginRedirect(true);
    } else if (res.data.response.status === 'User already exists') {
      setError('Este nombre de usuario ya esta en uso');
    } else if (res.data.response.status === 'Mail already exists') {
      setLoginRedirect(false);
      setError('Ya existe una cuenta asociada con este correo');
    }  else {
      setError('Ha ocurrido un error, vuelve a intentarlo');
    }
    setLoading(false);
  };

  const onClickButton = () => {
    if (passDetails) {
      showPassDetails(false)
    } else {
      showPassDetails(true)
    }
  }

  if (LoginRedirect) navigate('/login');

	return (
		<Background>
      <PageContainer>
        <InfoContainer>
          <Link to="/">
            <GoBackButton type="button"><RiArrowLeftLine />Volver</GoBackButton>
          </Link>
          <Outlet />
        </InfoContainer>
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
                checkForNumbers(event.target.value);
                checkForUpperCase(event.target.value);
                checkForLength(event.target.value);
                if (numberCheck && upperCheck && lengthCheck) setPass(event.target.value)
                }}
              required>
              </Input>
              <input type='button' onClick={onClickButton}></input>
            </InputContainer>
            {passDetails && (
              <ReqContainer>
                <PassRequirement>
                  <p>La contraseña debe tener al menos 6 caracteres, 1 número y 1 mayúscula.</p>
                </PassRequirement>
              </ReqContainer>
              )}
            <DataContainer>
              <ButtonStyle type="submit">
                <Icon>
                  <IconContext.Provider value={{
                    style: { verticalAlign: 'middle' },
                    color: '#fafafa',
                    className: 'enter',
                    size: '2em'
                  }}>
                    <RiArrowRightLine />
                  </IconContext.Provider>
                </Icon>
              </ButtonStyle>
              <Link to="/login">
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
      </PageContainer>
		</Background>
	);
}

export default Register;
