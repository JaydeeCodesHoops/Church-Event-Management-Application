import React from 'react'

const EventItem = ({event}) => {
    return(
        <li>
            <p style={{fontSize:20}}><span style={{fontWeight: 'bold'}}>Title: </span>{event.title}</p>
            <p style={{fontSize:20}}><span style={{fontWeight: 'bold'}}>Description: </span> {event.description}</p>
            <p style={{fontSize:20}}><span style={{fontWeight: 'bold'}}>Location: </span> {event.location}</p>
            <p style={{fontSize:20}}><span style={{fontWeight: 'bold'}}>Date: </span> {event.date}</p>
        </li>
    );
};

export default EventItem