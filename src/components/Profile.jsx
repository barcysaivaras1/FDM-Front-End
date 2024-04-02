import '../css/Profile.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import pfp from '../assets/johnpork.png';
import NavBar from "./NavBar";
import { getApiURL } from './api';


export function Profile() {
    const [profile, setProfile] = useState()
    function fetchProfile() {
        axios.get(
            // getApiURL('/users/profile'), 
            '/api/users/profile',
            { 
                withCredentials: true 
            }
        )
        .then(function(response) {
            console.log(response.data)
            setProfile(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchProfile();
    }, [])
  
    return(
        
        <div className="container">
            <NavBar/>
            <div className='header'>
                <p className="head">View Profile</p>
            </div>
            <div className="personal">
                <img className='pfp' src={pfp} alt="pfp" />
                <p className="name">John Pork</p>     
            </div>
            <div className="role">
                Level 1 Employee
            </div>
            <div className="data">
                <p className="title">Line Manager</p>
                <p className="cont">Jonesy Rothschild</p>
                <p className="title">Total Accepted Claims</p>
                <p className="cont">1</p>
                <p className="title">Total Budget Spent</p>
                <p className="cont">£49.99</p>
            </div>
        </div>
        

    )
}
