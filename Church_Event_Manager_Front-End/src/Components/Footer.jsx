import Icons from './SocialIcons';
import image from '../assets/CTC-bgRemove.png';
import image2 from '../assets/logo.png';
import { FaLocationPin, FaEnvelope, FaPhone } from 'react-icons/fa6';


import '../CSS/Footer.css'

export default function Footer(){
    return(
    <>
        {/* <div style={{backgroundColor: "black", height: "60px"}}></div> */}
        <div className="footAboutBox">
            <div className="leftBox">
                <img className="footer-image" src={image} alt="CTC-image"/>
            </div>
            <div className="aboutBoxMiddle">
                <div style={{padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <h4 style={{ color: "black", fontSize:  "25px", fontFamily: "calibri"}}>This is an Event Manager Application produced by The Bishop E.P Clark Youth Foundation</h4><br/>
                </div>
                <div className="threeBoxes">
                    <div>
                        <h1>Events</h1><br/>
                        <div style={{display: "flex", flexDirection: "column", gap: "7px", fontSize: "20px"}}>
                            <p>Youth Nights</p>
                            <p>Prayer Meetings</p>
                            <p>Mass Services</p>
                            <p>Production Services</p>
                            <p>Fundraising Events</p>
                        </div>
                    </div>
                    <div>
                        <h1>Contact</h1><br/>
                        <div style={{display: "flex", flexDirection: "column", gap: "7px", fontSize: "20px"}}>
                            <p><span style={{color: "red"}}><FaLocationPin/></span> 49 14th Avenue, Pelican Park, Cape Town, 7941</p>
                            <p><span style={{color: "black"}}><FaEnvelope/></span> vanschalkwykjaden10@gmail.com</p>
                            <p><span style={{color: "black"}}><FaPhone/></span> 069 315 5864</p>
                        </div>
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