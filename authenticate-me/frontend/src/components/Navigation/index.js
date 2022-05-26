import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <ul>
            <ProfileButton />
            <NavLink to='/'>Home</NavLink>
            <NavLink to= '/login'>Log In</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
            <NavLink to='/logout'>Logout</NavLink>
        </ul>
    )
}

export default Navigation;
