import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useAuthValue } from "../../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import "./style.css";


export default function Header() {
    const { logout } = useAuthentication();
    const { user } = useAuthValue();
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive); 
    }

    const disableMenu = () => {
        if(!menuActive) return ;
        if(menuActive) {
            setMenuActive(false); 
        }
    }

    return (
        <header className="header">
            <nav>
                <NavLink className="logo" to="/">
                    Mini<span>Blog</span>
                </NavLink>
                <ul className={menuActive ? "active" : ""}>
                    <li onClick={disableMenu}><NavLink to="/">Home</NavLink></li>
                    <li onClick={disableMenu}><NavLink to="/about">About</NavLink></li>
                    {user ?
                        <>                            
                            <li onClick={disableMenu}><NavLink to="/myposts">Dashboard</NavLink></li>
                            <li onClick={disableMenu}><NavLink to="/profile">Profile</NavLink></li>
                            <li onClick={disableMenu}><a onClick={logout}>Logout</a></li>
                        </>
                        :
                        <>
                            <li onClick={disableMenu}><NavLink to="/login">Login</NavLink></li>
                            <li onClick={disableMenu}><NavLink to="/register">Register</NavLink></li>
                        </>
                    }
                </ul>
                <span className="icon" onClick={toggleMenu}>
                    {menuActive ? <FaTimes /> : <FaBars />}
                </span>
            </nav>
        </header>
    )
}