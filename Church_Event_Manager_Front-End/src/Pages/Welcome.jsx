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
                <div>
                    <p>Hi</p>
                </div>
            </div>
        </div>

        </>
    );
 }
 export default Welcome;

