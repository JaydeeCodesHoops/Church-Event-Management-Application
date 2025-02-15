import React, { useState, useEffect } from "react";
import EventItem2 from "./EventItem2"; // Assuming EventItem is already implemented
import axios from "axios"; // To handle API calls
import "/src/CSS/EventList2.css";

const EventAttendance = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState(""); // State to store the filter value
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken"); // jwtToken is stored in sessionStorage to verify the user

        if (!token) {
          throw new Error("User is not authenticated.");
        }

        const response = await axios.get("http://localhost:5231/api/EventModels", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched events:", response.data);
        setEvents(response.data);
        setFilteredEvents(response.data); // Initialize filtered events
      } catch (error) {
        console.error("Error fetching Events", error);
        alert("Failed to load Events. Check console for more details.");
      }
    };
    fetchEvents();
  }, []);

  // Handle attendance submission
  const handleAttendance = async (eventId, attendanceStatus) => {
    try {
      const token = sessionStorage.getItem("jwtToken");

      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      await axios.post(
        "http://localhost:5231/api/Attendance",
        {
          EventId: eventId,
          AttendanceStatus: attendanceStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Attendance marked as "${attendanceStatus}" for event ID ${eventId}`);
    } catch (error) {
      console.error("Error marking attendance:", error);

      if (error.response && error.response.data) {
        alert(`Failed: ${error.response.data}`);
      } else {
        alert("Failed to mark attendance. Please try again.");
      }
    }
  };

  // Handle filter input change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    // Filter events based on location
    const filtered = events.filter((event) =>
      event.location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  if (events.length === 0) return 
    <div style={{margin: 0}}>
      <p>No events available.</p>
    </div>;

  return (
    <div>
      <div className="Hp">
        <h2 style={{ fontSize: "40px" }}>Upcoming Events</h2>
        <p style={{ fontSize: "20px" }}>Mark your Attendance</p>
      </div>
      <div className="filterContainer">
  <input
    type="text"
    placeholder="Filter by location"
    value={filter}
    onChange={handleFilterChange}
    className="filterInput"
  />
</div>

      <div className="eventList">
        {filteredEvents.map((event) => (
          <div key={event.id} className="eventWrapper">
            <div className="viewEvents">
              <div>
                <EventItem2 event={event} />
              </div>
              <div className="attendanceBtns">
                <p>Attendance</p>
                <button onClick={() => handleAttendance(event.id, "Yes")}>Yes</button>
                <button onClick={() => handleAttendance(event.id, "No")}>No</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventAttendance;
