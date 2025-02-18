import Header from '../Components/Header';
import '/src/CSS/Welcome.css';
import logo from '../assets/logo.png';
import worship from '../assets/worship.jpg'

function Welcome (){
 
    return (
        <>
        <div className="head">
            <Header/>
        </div>
        <div className="welcomepage">
            <div className='logo'> 
                <img src={logo} alt="" style={{height:'250px',width:'200px'}} />
            </div>
            <div className="aboutModal">
                <div style={{backgroundColor: "black", height: "7vh", width: '100%', display: 'flex', justifyContent: "center", alignItems: "center", borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}}>
                    <h1 className='heading'>About</h1>
                </div>
                <div style={{padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <h2 style={{fontWeight: "bold", }}>Good Day</h2><br/>
                    <h4>...This is an Event Manager Application produced by The Bishop E.P Clark Youth Foundation...</h4><br/>
                    <p>Imagine a application that makes everyone's experience much easier to just book your seat at an event that you would like to attend to.<br/>
                       Everything is so much easier with the <span style={{fontWeight: "bold", }}>Church Event Management Application</span>, marking your attendance  by just one click!
                    </p><br/>
                    <p>--:: Enjoy the Booking to Enjoy the event ::--</p>
                </div>
            </div>
        </div>

        </>
    );
 }
 export default Welcome;

