import '../CSS/Footer.css'

export default function Footer(){
    return(
    <>

        <div className="footAboutBox">

                <div className="leftBox">
                    <h4>To register <span style={{fontSize: "20px"}}>"Click"</span> the Register button on top</h4>
                </div>

            <div className="aboutBoxMiddle">
                <div style={{backgroundColor: "black", height: "7vh", width: '100%', display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <h1 className='heading'>About</h1>
                </div>
                <div style={{padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <h4 style={{textDecoration: "underline"}}>...This is an Event Manager Application produced by The Bishop E.P Clark Youth Foundation...</h4><br/>
                    <p>Imagine a application that makes everyone's experience much easier to just book your seat at an event that you would like to attend to.<br/>
                       Everything is so much easier with the <span style={{fontWeight: "bold", color: "yellow"}}>Church Event Management Application</span>, marking your attendance  by just one click!
                    </p><br/>
                    <p>--:: Enjoy the Booking to Enjoy the event ::--</p>
                </div>
            </div>

                <div className="rightBox">
                    <h4>To mark your attendance for events <span style={{fontSize: "20px"}}>"Click"</span> the Login button on top</h4>
                </div>

        </div>
        <div className="copyRight">
            
        </div>
    </>
    );
}