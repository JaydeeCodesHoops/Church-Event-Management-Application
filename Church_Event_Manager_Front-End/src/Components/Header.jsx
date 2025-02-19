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
                <div style={{backgroundColor: "black", color: "yellow", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img src={logo} alt="" style={{height:'70px',width:'70px'}} />
                    <h1>Church Event Management Application</h1>
                </div>
                <div className="button2">
                    <button id="btn2" onClick={handleLogin}>Login</button>
                </div>
            </div>
    </>
    );
}