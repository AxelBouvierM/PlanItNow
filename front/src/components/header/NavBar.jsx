import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Fade as Hamburger } from 'hamburger-react'

import icon from '../../images/pinLogoEstirado.png'
import { RiHome2Line, RiAccountCircleLine, RiCalendar2Line, RiLogoutBoxRLine, RiLayout2Line } from 'react-icons/ri';

import '../../styles/navigation.css';

const LogoContainer = styled.div`
	display: flex;
	position: fixed;
	margin-left: 3.5em;
	margin-top: 2em;
	z-index: 2;
`;

const Logo = styled.img`
	max-width: 15em;
	max-height: 1em;
	height: fit-content;
	opacity: 1;
	transition: 0.6s ease-in-out;
	&:hover {
		transform: translateX(1em);
		transition: 0.6s ease-in-out;
	}
`;

const ButtonStyle = styled.button`
  width: fit-content;
  display: inline-block;
  margin: 0 1.5em;
  padding:0.35em 1.2em;
  border: none;
  border-bottom: 0.1em solid #FFFFFF;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  font-size: 1.2em;
  color:#FFFFFF;
  transition: all 0.3s;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
	}
`;

const LogOutButtonStyle = styled.button`
  display: inline-block;
  position: fixed;
  bottom: 2em;
  width: fit-content;
  height: 2.5em;
  margin: 0 2em;
  padding:0.35em 1.2em;
  border: none;
  border-bottom: 0.1em solid #FFFFFF;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  font-size: 1em;
  color:#FFFFFF;
  transition: all 0.3s;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #000;
    background-color: crimson;
	}
`;

const Phrase = styled.p`
	width: fit-content;
	display: inline-block;
	transition: 0.3s ease-in-out;
	color: #fafafa;
	cursor: pointer;
	&:hover {
		transform:translateX(1em);
		transition: 0.2s ease-in-out;
		color: #000;
		font-weight: 1000;
	}
`;

export function NavBar() {
	const [cookie, unsetCookie] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const navigate = useNavigate();
	const navRef = useRef();

	const showNavBar = () => {
		navRef.current.classList.toggle('responsive_nav')
	}

	if (cookie) {
		axios.get('/logout')
			.then((res) => {
				if (res.data.response.status === 'Ok') setRedirect(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	if (redirect) navigate('/ingresar');

  	return (
	<header>
		<button type="button" id="openButton" className='nav-btn' onClick={showNavBar}>
			<Hamburger />
		</button>
		<nav ref={navRef}>
			<Phrase><Link to="/inicio" style={{ color: '#fafafa', textDecoration: 'none' }}><ButtonStyle><RiHome2Line style={{ verticalAlign: 'middle' }} /></ButtonStyle>Inicio</Link></Phrase>
			<Phrase><Link to="/categorias" style={{ color: '#fafafa', textDecoration: 'none' }}><ButtonStyle><RiLayout2Line style={{ verticalAlign: 'middle' }} /></ButtonStyle>Categorías</Link></Phrase>
			<Phrase><Link to="/perfil" style={{ color: '#fafafa', textDecoration:'none' }}><ButtonStyle><RiAccountCircleLine style={{ verticalAlign: 'middle' }} /></ButtonStyle>Perfil</Link></Phrase>
			<LogOutButtonStyle onClick={() => unsetCookie(true)}><RiLogoutBoxRLine style={{ verticalAlign: 'middle', marginRight: '1em' }} />Cerrar sesión</LogOutButtonStyle>
		</nav>
		<Outlet />
		<LogoContainer><Logo src={icon}></Logo></LogoContainer>
	</header>
  )
}
