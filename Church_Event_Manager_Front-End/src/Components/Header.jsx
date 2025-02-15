import { useNavigate } from 'react-router-dom';
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
                <div>
                    <button id="btn1" onClick={handleRegister}>Register</button>
                </div>
                <div style={{backgroundColor: "black", color: "yellow"}}>
                    <h1>Church Event Management Application</h1>
                </div>
                <div>
                    <button id="btn2" onClick={handleLogin}>Login</button>
                </div>
            </div>
    </>
    );
}