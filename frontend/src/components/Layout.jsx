import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";

export function Layout() {
    const { user } = useContext(AuthContext);
    return (
        <div className="layout-container">
            {user &&<Navbar />}
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}
