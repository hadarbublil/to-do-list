import React, { useContext } from "react";
import AuthContext from '../context/AuthContext';

const SignOutButton = () => {
    const { logout } = useContext(AuthContext); 

    const handleSignOut = () => {
        logout();
    };

    return (
        <button onClick={handleSignOut} className="signout-btn">
            Sign Out
        </button>
    );
}

export default SignOutButton;

