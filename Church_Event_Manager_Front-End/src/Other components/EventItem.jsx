import React from 'react'
import '../CSS/EventList1.css'

const EventItem = ({event, deleteEvent, setCurrentEvent}) => {
    return(
        <>
        <div className="eventItem">
            <div className="eventInfo">
                <p style={{fontSize:20}}><span style={{fontWeight: 'bold'}}>Title:</span> {event.title}</p>
                <p style={{fontSize:20}}><span style={{fontWeight: 'bold'}}>Description:</span> {event.description}</p>
                <p style={{fontSize:20}}><span style={{fontWeight: 'bold'}}>Location:</span> {event.location}</p>
                <p style={{fontSize:20}}><span style={{fontWeight: 'bold'}}>Date:</span> {event.date}</p>
            </div>
            <div className="editDeleteBtns">
                <button onClick={() => setCurrentEvent(event)}>Edit</button>
                <button style={{marginBottom: '10px'}} onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
        </div>
        </>
    );
};

export default EventItem