import { useNavigate } from "react-router-dom";

export default function Contact(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return(
        <>
            <h1>
                This is the Contact list for all the leaders and admins.
            </h1>
            <button onClick={handleClick}>back to welcomePage</button>
        </>
    );
}