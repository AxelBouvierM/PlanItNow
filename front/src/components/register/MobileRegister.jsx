import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import registerBg from '../../images/registerBg.jpg'
import { IconContext } from "react-icons";
import { RiArrowLeftLine, RiArrowRightLine, RiErrorWarningLine, RiCheckLine } from 'react-icons/ri';
import MoonLoader from 'react-spinners/MoonLoader';

import appLogo from '../../images/pinLogoApp.png'

const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${registerBg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 3em;
`;

const ContentContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
`;

const AppLogo = styled.img`
        max-width: 7em;
        max-height: 7em;
        height: fit-content;
        opacity: 1;
        transition: 0.6s ease-in-out;
`;

const GoBackContainer = styled.a`
  display: flex;
        position: relative;
        width: 100vw;
  padding: 3em 3em 0 3em;
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

const MobileRegisterContainer = styled.div`
  display: flex;
  position: relative;
  width: 85%;
  max-height: 85vh;
  height: fit-content;
  background-color: transparent;
  align-items: center;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.20);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 1em;
  margin: auto;
  justify-content: center;
`;

const Title = styled.p`
  color: #fafafa;
  display: block;
  font-size: 1.8em;
  transition: 0.3s ease-in-out;
  &:hover {
        color: white;
  transition: 0.5s ease-in-out;
  }
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
  width: 90%;
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
  margin-top: 0.5em;
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
  transition: 0.5s ease-in-out;
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
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1em;
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

  useEffect(() => {
    axios.get('/login/check')
      .then((res) => {
        if (res.data.response.status === 'Ok') navigate('/inicio');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate])

  function checkPassRequirements(string="") {
    console.log("STRING", string);
    const intMatch = string.match(/\d+/g);
    console.log("resultado:", intMatch);
    const upperMatch = string.match(/[A-Z]/);

    setNicePassword(false);
    if (string.length >= 6 && intMatch != null && upperMatch != null) {
      setPassError(null);
      return (true);
    } else if (string.length < 6) {
      setPassError('La contraseña debe tener al menos 7 caracteres.');
      return(false);
    } else if (intMatch == null) {
      setPassError('La contraseña debe tener al menos 1 número.');
      return(false);
    } else if (upperMatch == null) {
      setPassError('La contraseña debe tener al menos 1 mayúscula.');
      return(false);
    } else {
      setPassError('Ha ocurrido un error, vuelve a intentarlo');
      return (false);
    }
  }

  async function SendFormInput(event) {
    event.preventDefault();
    if (!checkPassRequirements(password)) return;
    console.log("asaga");
    const headers = {
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip, deflate, br',
    };

    const imagePicker = Math.floor(Math.random() * 12);

    const regData = {
      'username': username,
      'mail': mail,
      'password': password,
      'avatar': imagePicker
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
      setError('El nombre de usuario debe tener al menos 7 caracteres');
    } else if (res.data.response.status === 'Please complete all the data') {
      setError('Debes completar todos los campos');
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
      <ContentContainer>
        <MobileRegisterContainer>
          <FormContainer onSubmit={SendFormInput}>
            <AppLogo src={appLogo} />
            <Title>REGÍSTRATE</Title>
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
                value={password}
                onChange={(e) => { setPass(e.target.value)}}
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
              {isLoading && (
                <LoadingWrapper>
                  <MoonLoader loading color="white" size={20} />
                </LoadingWrapper>
              )}
            </DataContainer>
            <Link to="/ingresar">
              <LoginText>¿Ya tienes una cuenta?</LoginText>
            </Link>
            <Outlet />
          </FormContainer>
        </MobileRegisterContainer>
      </ContentContainer>
    </Background>
  );
}

export default Register;