import React from "react";
import "../css/Profile.css"
import NavBar from "./navbar";


export function Profile() {
    return (
        <div>
            <NavBar/> 
            <div id="ProfileBody">
            <p>Hello Profile World!</p>
            </div>
        </div>
    )
}