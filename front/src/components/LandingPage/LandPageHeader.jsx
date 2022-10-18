import React from 'react'
import styled from 'styled-components'
import { Outlet, Link } from 'react-router-dom';

import testLogo from '../../images/testLogo.png'

const HeaderContainer = styled.div`
	display: flex;
	position: absolute;
	width: 100vw;
  padding: 0 3em;
  top: 0;
  z-index: 3;
  @media all and (max-width:37em) {
    & {
      padding: 0 1em;
    }
  }
`;

const LogoContainer = styled.div`
	display: flex;
	position: relative;
  width: fit-content;
  margin-right: 1em;
`;

const Logo = styled.img`
	width: 7em;
	height: 7em;
	opacity: 1;
  @media all and (max-width:37em) {
    & {
    width: 5em;
    height: 5em;
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
`;

const AccountButton = styled.a`
  display:inline-block;
  margin: 0 1em;
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
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
  @media all and (max-width:600px) {
    & {
    display: block;
    margin: auto;
  }
}
`;

const ButtonTitle = styled.span`
	z-index: 1;
  position: relative;
`;

function LandPageHeader() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={testLogo} />
      </LogoContainer>
      <ButtonsContainer>
        <Link to="/register">
          <AccountButton type="button"><ButtonTitle>Registrarse</ButtonTitle></AccountButton>
        </Link>
        <Link to="/login">
          <AccountButton type="button"><ButtonTitle>Iniciar sesión</ButtonTitle></AccountButton>
        </Link>
        <Outlet />
      </ButtonsContainer>
    </HeaderContainer>
  )
}

export default LandPageHeader;
