import "./navbar.css"
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isAdmin = true;
    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo">JourneyMate</span>
                <div className="navItems">
                    <button className="navButton">Register</button>
                    {isAdmin &&<button className="navButton" onClick={()=>navigate("/admin")}>Login</button>}
                </div>
            </div>
        </div>
    );
};


export default Navbar
