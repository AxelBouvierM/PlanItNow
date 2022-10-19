import React from 'react'
import EventCalendar from '../components/body/calendar/EventCalendar'
import { NavBar } from '../components/header/NavBar';

function Agenda() {
	return (
		<>
			<NavBar />
			<EventCalendar />
	  	</>
	);
  }
export default Agenda;
