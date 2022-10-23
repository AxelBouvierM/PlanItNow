import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Fade as Hamburger } from 'hamburger-react'

import icon from '../../images/pinLogoEstirado.png'
import { RiHome2Line, RiAccountCircleLine, RiCalendar2Line, RiLogoutBoxRLine, RiLayout2Line } from 'react-icons/ri';

import '../../styles/navigation.css';

const LogoContainer = styled.div`
	display: flex;
	position: relative;
	margin-left: 1.2em;
`;

const Logo = styled.img`
	max-width: 15em;
	max-height: 1em;
	height: fit-content;
	opacity: 1;
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

const Phrase = styled.p`
	display: inline-block;
	transition: 0.3s ease-in-out;
	color: #fafafa;
	cursor: pointer;
	&:hover {
		transform:translateX(1em);
		transition: 0.2s ease-in-out;
		color: #fafafa;
		font-weight: 1000;
	}
`;

export function NavBar() {
	const [openedNavbar, setOpenedNavbar] = useState(true);
	const [cookie, unsetCookie] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const navigate = useNavigate();
	const navRef = useRef();

	const showNavBar = () => {
		setOpenedNavbar(!openedNavbar);
		navRef.current.classList.toggle('responsive_nav')
		if (openedNavbar) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}

	useEffect(() => {
		if (cookie) {
			axios.get('/logout')
				.then((res) => {
					if (res.data === 'status: Ok') setRedirect(true);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	if (redirect) navigate('/ingresar');

  	return (
	<header>
		<button type="button" id="openButton" className='nav-btn' onClick={showNavBar}>
			<Hamburger />
		</button>
		<nav ref={navRef}>
			<Link to="/inicio"><Phrase><ButtonStyle><RiHome2Line style={{ verticalAlign: 'middle' }} /></ButtonStyle>Inicio</Phrase></Link>
			<Link to="/agenda"><Phrase><ButtonStyle><RiCalendar2Line style={{ verticalAlign: 'middle' }} /></ButtonStyle>Agenda</Phrase></Link>
			<Link to="/categorias"><Phrase><ButtonStyle><RiLayout2Line style={{ verticalAlign: 'middle' }} /></ButtonStyle>Categorías</Phrase></Link>
			<Link to="/perfil"><Phrase><ButtonStyle><RiAccountCircleLine style={{ verticalAlign: 'middle' }} /></ButtonStyle>Perfil</Phrase></Link>
			<Phrase><ButtonStyle onClick={() => unsetCookie(true)}><RiLogoutBoxRLine style={{ verticalAlign: 'middle' }} /></ButtonStyle>Cerrar sesión</Phrase>
		</nav>
		<Outlet />
		<LogoContainer><Logo src={icon}></Logo></LogoContainer>
	</header>
  )
}
