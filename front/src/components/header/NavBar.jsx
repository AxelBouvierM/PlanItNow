import React, { useState } from 'react';
import { useRef } from 'react';
import { Outlet, Link } from "react-router-dom";
import styled from 'styled-components';
import { Fade as Hamburger } from 'hamburger-react'

import icon from '../../images/pinLogoEstirado.png'
import { IconContext } from 'react-icons';
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

const ButtonStyle = styled.a`
  display: inline-block;
  margin: 0 1em 0 0;
  padding:0.35em 1.2em;
  border:0.1em solid #FFFFFF;
  border-radius: 20px;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  font-size: 1.2em;
  color:#FFFFFF;
  transition: all 0.2s;
  &:hover {
    color:#000000;
    background-color: #fafafa;
	}
`;

const Phrase = styled.p`
	display: inline-block;
	transition: 0.2s ease-in-out;
	&:hover {
		transform:translateX(1em);
		transition: 0.2s ease-in-out;

	}
`;

export function NavBar() {
	const [openedNavbar, setOpenedNavbar] = useState(true);
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
  	return (
	<header>
		<button type="button" id="openButton" className='nav-btn' onClick={showNavBar}>
			<Hamburger />
		</button>
		<nav ref={navRef}>
					<Link to="/inicio"><ButtonStyle><RiHome2Line style={{ verticalAlign: 'middle' }} /></ButtonStyle><Phrase className='phrase'>Inicio</Phrase></Link>
					<Link to="/agenda"><ButtonStyle><RiCalendar2Line style={{ verticalAlign: 'middle' }} /></ButtonStyle><Phrase className='phrase'>Agenda</Phrase></Link>
					<Link to="/categorias"><ButtonStyle><RiLayout2Line style={{ verticalAlign: 'middle' }} /></ButtonStyle><Phrase className='phrase'>Categorías</Phrase></Link>
					<Link to="/perfil"><ButtonStyle><RiAccountCircleLine style={{ verticalAlign: 'middle' }} /></ButtonStyle><Phrase className='phrase'>Perfil</Phrase></Link>
					<Link to="/ingresar"><ButtonStyle><RiLogoutBoxRLine style={{ verticalAlign: 'middle' }} /></ButtonStyle><Phrase className='phrase'>Cerrar sesión</Phrase></Link>
		</nav>
		<Outlet />
		<LogoContainer><Logo src={icon}></Logo></LogoContainer>
	</header>
  )
}
