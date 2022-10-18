import React, {Component} from "react";
import '../App.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

class EventCalendar extends Component {

    render(){
        return(
            <FullCalendar 
            plugins={[ dayGridPlugin ]} 
            initialView="dayGridMonth"
            events={[
                { title: 'Maria Becerra', date: '2022-10-18'},
                { title: 'Avatar - Estreno', date: '2022-10-21'}
            ]}
            />
        )
    }
}
export default EventCalendar