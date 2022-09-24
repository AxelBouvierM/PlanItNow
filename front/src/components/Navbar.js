import { useRef } from 'react';

import { FaBars, FaTimes } from 'react-icons/fa';
import { VscSettingsGear } from 'react-icons/vsc';
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsCalendarRange } from 'react-icons/bs';
import { RiHome2Line, RiHistoryFill, RiAccountCircleLine } from 'react-icons/ri';

import '../styles/navigation.css';

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle('responsive_nav')
	}
  	return (
	<header>
		<div className="btn-container">
			<button type="button" className='nav-btn' onClick={showNavbar}>
				<FaBars />
			</button>
			<nav ref={navRef}>
				<a href='/#'><i><RiHome2Line /></i><span>Inicio</span></a>
				<a href='/#'><i><BsCalendarRange /></i><span>Agenda</span></a>
				<a href='/#'><i><HiOutlineUserGroup /></i><span>Sala</span></a>
				<a href='/#'><i><RiHistoryFill /></i><span>Historial</span></a>
				<a href='/#'><i><RiAccountCircleLine /></i><span>Cuenta</span></a>
				<a href='/#'><i><VscSettingsGear /></i><span>Configuración</span></a>
				<button className='nav-btn nav-close-btn' onClick={showNavbar}>
					<FaTimes/>
				</button>
			</nav>
		</div>
	</header>
  )
}

export default Navbar
