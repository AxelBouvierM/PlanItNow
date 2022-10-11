import { React, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Outlet, Link } from 'react-router-dom';

import montaña4 from '../images/montaña4.jpg'
import logo from '../images/testLogo.png'

import { IconContext } from "react-icons";
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
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
  margin-bottom: 4em;
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

function Register() {
	const [username, setUser] = useState('')
	const [mail, setMail] = useState('')
	const [password, setPass] = useState('')
  const [isLoading, setLoading] = useState(false);
  const [wrongMail, setWrongMail] = useState(false);


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

    const response = await axios.post('/register', regData, { headers: headers }).catch((err) => {
      console.log("Error: ", err);
    });

    if (response) {
      console.log("Response: ", response.data);
    }
    setLoading(false);
    console.log('Cargando?', isLoading);
  };
		/*axios.post('/register', regData, { headers: headers })
			.then((res) => {
				if (res.data === 'Not Found') {
					console.log(res);
				} else {
					console.log(res)
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};*/

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
            <TextSpace>REGISTRARTE</TextSpace>
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
              placeholder="E-mail"
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
