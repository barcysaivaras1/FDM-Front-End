import React from "react";
import "../css/Profile.css"
import NavBar from "./NavBar";


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