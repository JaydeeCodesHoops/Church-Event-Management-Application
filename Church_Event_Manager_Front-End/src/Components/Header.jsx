import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../CSS/Header.css';

export default function Header(){
    const navigate = useNavigate();
    
    const handleRegister = () => {
        navigate('/register');
    };
    
    const handleLogin = () => {
        navigate('/login');
    };

    return(
    <>
            <div className="buttons">
                <div className="button1">
                    <button id="btn1" onClick={handleRegister}>Register</button>
                </div>
                <a href="/gallery" target="_blank" rel="noopener noreferrer" style={{color: "white"}}>
                    <p>Gallery</p>
                </a>
                <div style={{backgroundColor: "black", color: "yellow", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img src={logo} alt="" style={{height:'70px',width:'70px'}} />
                    <h1>Church Event Management Application</h1>
                </div>
                <a href="/contact" target="_blank" rel="noopener noreferrer" style={{color: "white"}}>
                    <p>Contact</p>
                </a>
                <div className="button2">
                    <button id="btn2" onClick={handleLogin}>Login</button>
                </div>
            </div>
    </>
    );
}