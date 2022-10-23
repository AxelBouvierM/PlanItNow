import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EventCalendar from '../components/body/calendar/EventCalendar';
import { NavBar } from '../components/header/NavBar';
import { Footer } from '../components/footer/Footer'
import styled from 'styled-components';
/*import bg from '../images/rambla6.jpg'*/

const Background = styled.div`
  position: absolute;
  background: rgb(131,58,180);
  background-image: radial-gradient( circle farthest-corner at 1% 1%,  rgba(131,58,180,1) 0.1%, rgba(0,0,0,1) 98.2% );
	width: 100%;
  height: 100%;
`;

function Agenda() {
	const navigate = useNavigate();

	axios.get('/login/check')
		.then((res) => {
			if (res.data.response.status === 'User not logged in') navigate('/ingresar');
		})
		.catch((err) => {
			console.log(err);
		});

	return (
		<Background>
			<NavBar />
			<EventCalendar />
			<Footer/>
	  	</Background>
	);
  }
export default Agenda;
