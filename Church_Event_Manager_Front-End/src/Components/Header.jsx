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

    const handleGallery = () => {
        navigate('/gallery');
    };

    const handleContact = () => {
        navigate('/contact');
    };

    return(
    <>
            <div className="header">
                <div className="button1">
                    <button id="btn-" onClick={handleRegister}>Register</button>
                </div>
                <div className="button3">
                    <button id="btn---" onClick={handleGallery}>Gallery</button>
                </div>
                <div className="hHeading">
                    <img src={logo} alt="" style={{height:'70px',width:'70px'}} />
                    <h1>Church Event Management Application</h1>
                </div>
                <div className="button4">
                    <button id="btn----" onClick={handleContact}>Contact</button>
                </div>
                <div className="button2">
                    <button id="btn--" onClick={handleLogin}>Login</button>
                </div>
            </div>
    </>
    );
}