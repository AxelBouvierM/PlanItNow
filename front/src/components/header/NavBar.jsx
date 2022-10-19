import React, { useState } from 'react';
import { useRef } from 'react';
import { Outlet, Link } from "react-router-dom";

import { Fade as Hamburger } from 'hamburger-react'
import { RiHome2Line, RiAccountCircleLine, RiCalendar2Line, RiSettings2Line, RiLogoutBoxRLine, RiLayout2Line } from 'react-icons/ri';

import '../../styles/navigation.css';

export function NavBar() {
	const [openedNavbar, setOpenedNavbar] = useState(false);
	const navRef = useRef();

	const showNavBar = () => {
		setOpenedNavbar(!openedNavbar)
		navRef.current.classList.toggle('responsive_nav')
		if (openedNavbar) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'unset';
		}
	}

  	return (
	<header>
				<button type="button" id="openButton" className='nav-btn' onClick={showNavBar}>
			<Hamburger />
		</button>
		<nav ref={navRef}>
			<Link to="/home"><i><RiHome2Line /></i><span>Inicio</span></Link>
			<Link to="/agenda"><i><RiCalendar2Line /></i><span>Agenda</span></Link>
			<Link to="/categories"><i><RiLayout2Line /></i><span>Categorías</span></Link>
			<Link to="/cuenta"><i><RiAccountCircleLine /></i><span>Perfil</span></Link>
			<Link to="/configuracion"><i><RiSettings2Line /></i><span>Configuración</span></Link>
			<Link to="/login"><i><RiLogoutBoxRLine /></i><span>Cerrar sesión</span></Link>
		</nav>
		<Outlet />
	</header>
  )
}
