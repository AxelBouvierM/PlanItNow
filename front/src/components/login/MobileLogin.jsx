import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import { IconContext } from "react-icons";
import { RiArrowRightLine, RiArrowLeftLine, RiErrorWarningLine } from 'react-icons/ri'

import loginBg from '../../images/loginBg.jpg'
import appLogo from '../../images/pinLogoApp.png';

const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${loginBg});
  background-position: center;
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
  padding: 3rem 3rem 1em 3rem;
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

const MobileLoginContainer = styled.div`
  display: flex;
  position: relative;
  width: 85%;
  max-height: 85vh;
  height: fit-content;
  background-color: transparent;
  align-items: center;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.20);
  backdrop-filter: blur(15px);
  justify-content: center;
  border-radius: 20px;
  margin: auto;
  padding: 1em;
`;

const Title = styled.p`
  color: #fafafa;
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 1.8em;
  transition: 0.3s ease-in-out;
  margin-bottom: 1em;
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
  width: 60%;
  display: flex;
  align-items: center;
  position: relative;
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

const ErrorWrapper = styled.div`
  width: 80%;
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

function MobileLogin() {
	const [username, setUser] = useState('');
	const [password, setPass] = useState('');
	const [giveAccess, setAccess] = useState(false);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

  useEffect(() => {
    axios.get('/login/check')
    .then((res) => {
      if (res.data.response.status === 'Ok') navigate('/inicio');
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

	function SendFormInput(event) {
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
			.then((res) => {
				if (res.data.response.status === 'Ok') {
					setAccess(true);
				} else {
					setAccess(false);
					setError(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
  
	if (giveAccess) navigate('/inicio');

  return (
	  <Background>
		  <GoBackContainer>
			  <Link to="/" className='linkStyle'>
				  <GoBackButton type="button" className='button-hover'><Icon><RiArrowLeftLine style={{ verticalAlign: 'middle', marginBottom: '0.2em' }} /></Icon>Volver</GoBackButton>
			  </Link>
			  <Outlet />
		  </GoBackContainer>
        <ContentContainer>
        <MobileLoginContainer>
          <FormContainer onSubmit={SendFormInput}>
            <AppLogo src={appLogo} />
            <Title>INICIAR SESIÓN</Title>
            {error && (
              <ErrorWrapper>
                <ErrorMessage><Icon><RiErrorWarningLine /></Icon>Usuario y/o contraseña incorrecta</ErrorMessage>
              </ErrorWrapper>
            )}
            <InputContainer>
              <Input
                key="user"
                type="text"
                className="loginInput"
                placeholder="Usuario / Email"
                value={username}
                onChange={(event) => setUser(event.target.value)}
                required>
              </Input>
            </InputContainer>
            <InputContainer>
              <Input
                key="password"
                autoFocus="autoFocus"
                type="password"
                className="loginInput"
                placeholder="Contraseña"
                value={password}
                onChange={(event) => setPass(event.target.value)}
                required>
              </Input>
            </InputContainer>
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
            </DataContainer>
            <Link to="/registrarse">
              <LoginText>Crear cuenta nueva</LoginText>
            </Link>
            <Outlet />
          </FormContainer>
        </MobileLoginContainer>
        </ContentContainer>
	  </Background>
  	)}
export default MobileLogin
