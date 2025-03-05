import Icons from './SocialIcons';
import image from '../assets/CTC-bgRemove.png';
import image2 from '../assets/logo.png';
import { FaLocationPin, FaEnvelope, FaPhone } from 'react-icons/fa6';


import '../CSS/Footer.css'

export default function Footer(){
    return(
    <>
        <div className="footAboutBox">
            <div className="leftBox">
                <img className="footer-image" src={image} alt="CTC-image"/>
            </div>
            <div className="aboutBoxMiddle">
                <div style={{padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <h4 style={{ color: "black", fontSize:  "25px", fontFamily: "calibri"}}>This is an Event Manager Application produced  The Bishop E.P Clark Youth Foundation</h4><br/>
                </div>
                <div className="threeBoxes">
                    <div className="events">
                        <h1 className="footer-events">Events</h1><br/>
                        <p className="events-text">Youth Nights</p>
                        <p className="events-text">Prayer Meetings</p>
                        <p className="events-text">Mass Services</p>
                        <p className="events-text">Production Services</p>
                        <p className="events-text">Fundraising Events</p>
                    </div>
                    <div className="contact">
                        <h1 className="footer-contact">Contact</h1><br/>
                        <p className="contact-text"><span style={{color: "black"}}><FaLocationPin/></span> 49 14th Avenue, Pelican Park, Cape Town, 7941</p>
                        <p className="contact-text"><span style={{color: "black"}}><FaEnvelope/></span> vanschalkwykjaden10@gmail.com</p>
                        <p className="contact-text"><span style={{color: "black"}}><FaPhone/></span> 069 315 5864</p>
                    </div>
                </div>
            </div>
            <div className="rightBox">
                <img className="footer-image" src={image2} alt="Youth-logo"/>
            </div>
        </div>
        <div className="moreAbout">
            <Icons/>
        </div>
    </>
    );
}