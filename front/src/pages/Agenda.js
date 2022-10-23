import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EventCalendar from '../components/body/calendar/EventCalendar';
import { NavBar } from '../components/header/NavBar';

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
		<>
			<NavBar />
			<EventCalendar />
	  	</>
	);
  }
export default Agenda;
