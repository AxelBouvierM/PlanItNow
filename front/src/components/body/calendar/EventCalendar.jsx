import {React, useState} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

function EventCalendar() {
    const [data, setData] = useState([]);

    axios.get('/calendar')
        .then((res) => {
            console.log(res);
            const values = Object.values(res.data)
            setData(values)
        })
        .catch((err) => {
            console.log(err);
        });

    return (
        <>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
                { title: 'event 1', date: '2022-10-24' },
                { title: 'event 2', date: '2022-11-04' }
            ]}
            headerToolbar={{
                right: "prev,next today",
                left: "title",
            }}
            titleFormat={{ 
                month: "long",
                year: "numeric",
            }}
            buttonText={{
                today: 'Hoy',
                month: 'Mes',
                week: 'Semana',
                day: 'Día',
                list: 'Lista'
            }}
            height="90vh"
            locale="es"
            /*select={handleAddEventSelectAndOpenModal}
            eventClick={handleEditEventSelectAndOpenModal}
            eventChange={handleUpdateEventSelect}*/
            initialEvents={data}
            longPressDelay={1000}
            eventLongPressDelay={1000}
            selectLongPressDelay={1000}
            dayMaxEvents={true}
            allDaySlot={false}
            editable={true}
            />
        </>
        )

    }
export default EventCalendar
