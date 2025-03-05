import React from 'react'
import {useNavigate} from 'react-router-dom'
import Form2 from '../Other components/EventFormC'
import '/src/CSS/EventList2.css'

const EventList2 = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }

    return(
        <>
       
        <div className="congregantBGimage">
            <div className="welcomeC">
                <div style={{ fontSize: 35, marginLeft: 0 }}>
                    <h1 style={{fontSize: 50}}> Welcome Congregant </h1>
                </div>
                <div className="welcomeCButton">
                    <button id="btn2" onClick={handleClick}> Logout </button>
                </div>
            </div>
            <div className="bodyC">
                <Form2/>
            </div>
        </div>
        </>
    );
};

export default EventList2