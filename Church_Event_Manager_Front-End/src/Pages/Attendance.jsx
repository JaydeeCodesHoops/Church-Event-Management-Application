import EventItem2 from '../Other components/EventItem2'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../CSS/Attendance.css";

const ViewAttendance = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch events from the backend
    useEffect(() => {
        const fetchEventsWithAttendance = async () => {
            try {
                const token = sessionStorage.getItem("jwtToken");
                if (!token) {
                    throw new Error("User is not authenticated.");
                }

                // Fetch events
                const eventResponse = await axios.get("http://localhost:5231/api/EventModels", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const eventsWithCounts = await Promise.all(
                    eventResponse.data.map(async (event) => {
                        try {
                            // Fetch attendance count for each event
                            const countResponse = await axios.get(`http://localhost:5231/api/Attendance/${event.id}/yes-count`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            return { ...event, yesCount: countResponse.data }; // Add yesCount to event object
                        } catch (error) {
                            console.error(`Error fetching attendance for event ${event.id}`, error);
                            return { ...event, yesCount: "Error" }; // Handle API errors gracefully
                        }
                    })
                );

                setEvents(eventsWithCounts);
            } catch (error) {
                console.error("Error fetching events and attendance", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventsWithAttendance();
    }, []);

    const handleClick = () => {
        navigate("/admin");
    };

    return (
        <>
            <div className="head">
                <h1 style={{ fontSize: 50 }}> Total Attendance </h1>
                <button id="btn2" onClick={handleClick}>
                    Back
                </button>
            </div>
    
            {loading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <div style={{ fontSize: 35, textAlign: 'center', marginTop: '20px', color: 'red'}}>
                    <p>No events available.</p>
                </div>
            ) : (
                <div className="attendanceBGimage">
                <div className="eventList">
                    {events.map((event) => (
                        <div key={event.id} className="eventWrapper">
                            <div className="viewEvents">
                                <div>
                                    <EventItem2 event={event} /> {/* Display event details */}
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <p style={{fontWeight: 'bold', fontSize: 20}}>Total Attendance</p>
                                    <p style={{fontWeight: 'bold', fontSize: 30}}>{event.yesCount}</p> {/* Display the Yes count */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}
        </>
    );
    
};

export default ViewAttendance;
