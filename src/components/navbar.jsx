import React from "react";
import '../css/navbar.css';
import { FaRegUser } from "react-icons/fa6";
import { FaPlusSquare } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";



function navbar () {
    return(
        <nav>
            <div>
                <IoDocumentsOutline /> 
                <p>View</p>
            </div>
            <FaPlusSquare />
            <div>
                <FaRegUser />
                <p>Profile</p>
            </div>
            
        </nav>
    )
}

export default navbar;