import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Outlet, Link, useNavigate } from 'react-router-dom';

import { IconContext } from "react-icons";
import { RiArrowRightLine, RiArrowLeftLine } from 'react-icons/ri'

import montaña2 from '../images/montaña2.jpg'
import logo from '../images/testLogo.png'

const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${montaña2});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
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
	background-color: royalblue;
  transition: 0.3s ease-in-out;
  }
`;

const LoginContainer = styled.div`
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
  margin-top: 0em;
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

/* const ImageSpace = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 1em;
  margin-bottom: 2em;
`;*/

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
	background-color: royalblue;
  transition: 0.3s ease-in-out;
  }
`;

const Icon = styled.i`
  vertical-align: middle;
`;

const LoginText = styled.a`
  color: #fafafa;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.8em;
  &:hover {
	color: royalblue;
  transition: 0.3s ease-in-out;
  }
`;

const ErrorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
`;

const ErrorMessage = styled.p`
  font-size: 1em;
  font-weight: 450;
  color: red;
  text-transform: uppercase;
`;

function Login() {
	const [username, setUser] = useState('')
	const [password, setPass] = useState('')
	const [giveAccess, setAccess] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate();

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
        if (res.data.response.status === 'ok') {
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

  if (giveAccess) navigate('/home');

	return (
		<Background>
				<Link to="/">
					<GoBackButton type="button"><RiArrowLeftLine />Volver</GoBackButton>
				</Link>
				<Outlet />
			<LoginContainer>
				<FormContainer onSubmit={SendFormInput}>
          <TextSpace>INICIAR SESIÓN</TextSpace>
          {error && (
            <ErrorWrapper>
              <ErrorMessage>Usuario y/o contraseña incorrecta</ErrorMessage>
            </ErrorWrapper>
          )}
						<InputContainer>
							<Input
								type="text"
								className="loginInput"
								placeholder="Usuario"
								value={username}
								onChange={(event) => setUser(event.target.value)}
								required>
							</Input>
						</InputContainer>
						<InputContainer>
							<Input
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
                      color: '#fafafa', 
                      className: 'enter', 
                      size: '2em' }}>
                    <RiArrowRightLine />
                  </IconContext.Provider>
                </Icon>
              </ButtonStyle>
              <Link to="/register">
                <LoginText>Crear cuenta nueva</LoginText>
              </Link>
              <Outlet />
            </DataContainer>
				</FormContainer>
			</LoginContainer>
		</Background>
	);
}

export default Login;
