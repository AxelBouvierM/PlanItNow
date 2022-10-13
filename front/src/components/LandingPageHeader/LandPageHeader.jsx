import React from 'react'
import styled from 'styled-components'
import { Outlet, Link } from 'react-router-dom';

import Login from '../../pages/Login'
import Register from '../../pages/Register'

import testLogo from '../../images/testLogo.png'

const HeaderContainer = styled.div`
	display: flex;
	position: fixed;
	width: 100%;
	height: 10%;
	background-color: rgba(0,0,0,0.50);
`;

const LogoContainer = styled.div`
	display: flex;
	position: relative;
	width: 50%;
	height: 100%;
`;

const Logo = styled.img`
	display: flex;
	position: relative;
`;

const ButtonsContainer = styled.div`
	display: inline-flex;
	position: relative;
	width: 50%;
	height: 100%;
	align-items: center;
	gap: 3em;
	flex-direction: row-reverse;
`;

const LoginButton = styled.button`
  width: 10em;
  height: 3em;
  display: inline-block;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  border: 3px solid #fafafa;
  color: white;
  font-size: 1em;
  vertical-align: middle;
  backdrop-filter: blur(15px);
  right: 0;
  margin-right: 2em;
  cursor: pointer;
  &:hover {
	background-color: rgba(0,0,0,0.50);
  	transition: 0.3s ease-in-out;
  }
`;

const RegisterButton = styled.button`
  width: 10em;
  height: 3em;
  display: inline-block;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid #fafafa;
  color: white;
  font-size: 1em;
  vertical-align: middle;
  backdrop-filter: blur(15px);
  right: 0;
  margin-left: auto;
  cursor: pointer;
  &:hover {
	background-color: rgba(0,0,0,0.50);
  	transition: 0.3s ease-in-out;
  }
`;

function LandPageHeader() {
  return (
	<HeaderContainer>
		<LogoContainer>
			  <Logo src={testLogo}/>
		</LogoContainer>
		<ButtonsContainer>
			  <Link to="/login">
				  <LoginButton type="button">Iniciar sesión</LoginButton>
			  </Link>
			<Link to="/register">
				<RegisterButton type="button">Registrarse</RegisterButton>
			</Link>
		  	<Outlet />
		</ButtonsContainer>
	</HeaderContainer>
  )
}

export default LandPageHeader;