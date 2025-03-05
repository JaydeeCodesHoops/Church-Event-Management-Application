import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Form1 from '../Other components/EventFormAdmin.jsx'
import EventItem from '../Other components/EventItem.jsx'
import '../CSS/EventList1.css'
import axios from 'axios'

const EventList1 = () => {
    const [event, setEvent] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [currentEvent, setCurrentEvent] = useState('');
    const [showevent, setShowEvent] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchEvents = async () => {
        try {
            const token = sessionStorage.getItem('jwtToken'); // jwtToken is stored in the sessionStorage and is used to verify if the user that has logged in is authorized to view events.
            
            if (!token) {
                throw new Error('User is not authenticated.');
            }

            const response = await axios.get('http://localhost:5231/api/EventModels', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Optional for GET, but ensures JSON is expected
                }
            });
            console.log('Fetched events:', response.data);
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching Events', error);
        }
    };
    fetchEvents();
}, [refresh]);


    const addEvent = async (event) => {

    const token = sessionStorage.getItem('jwtToken');
    const role = sessionStorage.getItem('userRole');

    if (!token || role != 'Admin') {
        console.log('User is not authenticated.');
        alert('User is not authenticated.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:5231/api/EventModels', event, {
            headers: {
                'Content-Type': 'application/json', // Ensures the data is sent as JSON
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Added Event:', response.data);
        
        // Update refresh state to reload or refresh event data as needed
        setRefresh(!refresh);
    } catch (error) {
        console.error('Error adding Event', error);
        alert('Error adding Event. Check console for more details.');
    }
};


    const updateEvent = async (event) => {
        try{
            const token = sessionStorage.getItem('jwtToken');
            if(!token){
                console.log('User is not authenticated.');
                alert('User is not authenticated');
                return;
            }

            const response = await axios.put(`http://localhost:5231/api/EventModels/${event.id}`, event, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if(response.status === 200){
                console.log('Updated Event:', response.data);
                setRefresh(!refresh);
                setCurrentEvent('');
            }else{
                console.error('Failed to update event', response);
                alert('Failed to update event');
            } 
        }catch(error){
            console.error('Error updating Event', error);
            alert('Error updating Event. Check console for more details.');
        }
    };

    const deleteEvent = async (id) => {
        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) {
                console.log('User is not authenticated.');
                alert('User is not authenticated.');
                return;
            }
    
            // Send a DELETE request
            const response = await axios.delete(`http://localhost:5231/api/EventModels/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('This event will be deleted.');
            if (response.status === 200) { // Check if the request succeeded
                console.log('Event deleted successfully');
                setEvent(response.data); // Update the event list directly from the response
            } else {
                console.error('Failed to delete event', response);
                alert('Failed to delete event.');
            }
        } catch (error) {
            console.error('Error deleting Event', error);
            alert('Error deleting Event. Check console for more details.');
        }
    };

    const handleClick2 = () => {
        navigate('/users')
    }
    
    const handleClick1 = () => {
        navigate('/attendance');
    }

    const handleClick = () => {
        navigate('/');
    }

    return(
        <>
     
        <div className="adminBGimage">
        <div className="welcomeA">
            <div style={{fontSize: 35, marginLeft: 0}}>
                <h1> Welcome Admin </h1>
            </div>
            <div className="btns">
                <button id="viewAllUsers" onClick={handleClick2}> View All Users </button>
                <button id="viewAttendance" onClick={handleClick1}> View Attendance </button>
                <button id="logoutBtn" onClick={handleClick}> Logout </button>
            </div>       
        </div>
        <div className="bodyA">
            <Form1
                addEvent={addEvent}
                updateEvent={updateEvent}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
            />

            <button id="viewhide" style={{marginBottom: '20px'}}
                type="button"
                onClick={() => {
                    setShowEvent((prev) => !prev);
                    console.log('Show Events toggled:', !showevent);
                }}
            > 
                {showevent ? 'Hide Events' : 'View Events'}
            </button>

            {showevent ? (
                event.length === 0 ? (
                    <p> No Events Available. </p>
                ) : (
                    <div className="eventList1">
                        {event.map((event) => ( 
                            <div key={event.id} className="eventWrapper1"> {/* Separate div for each event */}
                                <div className="viewEvents1">
                                    <EventItem
                                        key={event.id}
                                        event={event}
                                        deleteEvent={deleteEvent}
                                        setCurrentEvent={setCurrentEvent}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : null}
        </div>
        </div>
        </>
    );
};

export default EventList1