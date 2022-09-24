import { useRef } from 'react';

import { Fade as Hamburger } from 'hamburger-react'
import { RiHome2Line, RiAccountCircleLine, RiCalendar2Line, RiGroup2Line, RiSettings2Line, RiHistoryLine } from 'react-icons/ri';

import '../styles/navigation.css';

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle('responsive_nav')
	}
  	return (
	<header>
		<div className="btn-container">
			<button type="button" id="openButton" className='nav-btn' onClick={showNavbar}>
				<Hamburger />
			</button>
			<nav ref={navRef}>
				<a href='/#'><i><RiHome2Line /></i><span>Inicio</span></a>
				<a href='/#'><i><RiCalendar2Line /></i><span>Agenda</span></a>
				<a href='/#'><i><RiGroup2Line /></i><span>Sala</span></a>
				<a href='/#'><i><RiHistoryLine /></i><span>Historial</span></a>
				<a href='/#'><i><RiAccountCircleLine /></i><span>Cuenta</span></a>
				<a href='/#'><i><RiSettings2Line /></i><span>Configuración</span></a>
			</nav>
		</div>
	</header>
  )
}

export default Navbar
