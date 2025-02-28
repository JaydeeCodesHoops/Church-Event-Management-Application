import { useNavigate } from "react-router-dom";

export default function Gallery(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };
    
    return(
        <>
            <h1>
                This is the Gallery for some of the previous events and their description.
            </h1>
            <button onClick={handleClick}>back to welcomePage</button>
        </>
    );
}