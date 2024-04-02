import '../css/Profile.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import pfp from '../assets/johnpork.png';
import NavBar from "./NavBar";
import { getApiURL } from './api';


export function Profile() {
    const [profile, setProfile] = useState()
    const [totalAccepted, setTotalAccepted] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0.0);

    function fetchProfile() {
        axios.get(
            // getApiURL('/users/profile'), 
            '/api/users/profile',
            { 
                withCredentials: true 
            }
        )
        .then(function(response) {
            // console.log(response.data)
            setProfile(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    function calcVals() {
        // console.log(profile);
        if (profile.claims.length !== 0) {
            profile.claims.map((claim) => {
                if (claim.status == "approved") {
                    setTotalAccepted(totalAccepted + 1);
                    setTotalSpent((totalSpent) => {return totalSpent + parseFloat(claim.amount)});
                    // console.log(claim.amount);
                }
            })
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    useEffect(() => {
        if (!profile){
            return;
        }
        calcVals();
    }, [profile])
  
    return(
        
        <div className="container">
            <NavBar/>
            <div className='header'>
                <p className="head">View Profile</p>
            </div>
            <div className="personal">
                {profile ? (
                    <img className='pfp' src={'http://127.0.0.1:5000/' + profile.profile_picture} alt="pfp" />
                ) : null}
                <p className="name">
                    {profile ? (profile.first_name + " " + profile.last_name) : "-"}
                </p>     
            </div>
            <div className="role">
                {profile ? (profile.role) : "-"}
            </div>
            <div className="data">
                <p className="title">Line Manager</p>
                <p className="cont">
                    {profile ? (profile.line_manager) : "-"}
                </p>
                <p className="title">Total Accepted Claims</p>
                <p className="cont">
                    {/* 1  */}
                    {(totalAccepted !== 0) ? (totalAccepted) : "0"}
                </p>
                <p className="title">Total Budget Spent</p>
                <p className="cont">
                    {/* £49.99 */}
                    {(totalSpent !== 0.0) ? ("£" + (totalSpent / 2).toFixed(2) ) : "£0"}
                </p>
            </div>
        </div>
        

    )
}


/*
    Model reply from server for /users/profile:

    {
    "claims": [
        {
            "amount": "19.99",
            "description": "I need this for my mental health.",
            "status": "Pending",
            "title": "Fortnite card"
        },
        {
            "amount": "420.69",
            "description": "Please reinburse me this has made me broke",
            "status": "Pending",
            "title": "Gucci flip-flops"
        },
        {
            "amount": "21.59",
            "description": "example description",
            "status": "Pending",
            "title": "example title"
        }
    ],
    "first_name": "Armin",
    "last_name": "Shahnami",
    "line_manager": "manager",
    "profile_picture": "/static/profile-pictures/default.png",
    "role": "Employee",
    "username": "armin2"
    }

*/