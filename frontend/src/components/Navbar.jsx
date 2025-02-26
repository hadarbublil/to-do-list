import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton'; 
import './Navbar.css';

export function Navbar() {
    return (
        <nav>
            <ul>
                {/* <li><Link to="/">Home</Link></li>
                <li><Link to="/SignUp">SignUp</Link></li>
                <li><Link to="/tasks">My Tasks</Link></li>  */}
                <li><SignOutButton /></li> 
            </ul>
        </nav>
    );
}
