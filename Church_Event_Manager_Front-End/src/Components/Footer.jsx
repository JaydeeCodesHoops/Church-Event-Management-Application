import Icons from './SocialIcons';
import image from '../assets/CTC-bgRemove.png'
import image2 from '../assets/logo.png'

import '../CSS/Footer.css'

export default function Footer(){
    return(
    <>

        <div className="footAboutBox">
            <div className="leftBox">
                <img className="footer-image" src={image} alt="CTC-image"/>
            </div>
            <div className="aboutBoxMiddle">
                <div style={{backgroundColor: "brown", height: "7vh", width: '100%', display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <h1 className='heading'>About</h1>
                </div>
                <div style={{padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <h4 style={{ color: "black", fontSize:  "20px"}}>This is an Event Manager Application produced by The Bishop E.P Clark Youth Foundation</h4><br/>
                    <p>Imagine a application that makes everyone's experience much easier to just book your seat at an event that you would like to attend to.<br/>
                       Everything is so much easier with the <span style={{fontWeight: "bold", color: "yellow"}}>Church Event Management Application</span>, marking your attendance  by just one click!
                    </p><br/>
                    <p style={{color: "black", fontSize:  "20px"}}>--- Enjoy the Booking to Enjoy the event ---</p>
                </div>
            </div>
            <div className="rightBox">
                <img className="footer-image" src={image2} alt="CTC-image"/>
            </div>
        </div>
        <div className="moreAbout">
            <Icons/>
        </div>
    </>
    );
}