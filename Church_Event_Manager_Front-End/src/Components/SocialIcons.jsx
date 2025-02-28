import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import '../CSS/socialIcons.css';

export default function Icons(){
    return(
        <>
            <div className="socialIcons">
                <a href="https://www.instagram.com/epclarkfoundation?igsh=MXIzNzk4d2Y2NWoycQ== " target="_blank" rel="noopener noreferrer">
                    <FaInstagram color="white"/>
                </a>

                <a href="https://www.facebook.com/BishopEPCfoundation/" target="_blank" rel="noopener noreferrer">
                    <FaFacebook color="white"/>
                </a>

                <a href="https://www.linkedin.com/in/jaden-van-schalkwyk-76aba6317/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin color="white"/>
                </a>
            </div>
        </>
    );
}