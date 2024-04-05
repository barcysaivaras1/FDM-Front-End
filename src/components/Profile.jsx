import '../css/Profile.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";


export function Profile() {
    const [profile, setProfile] = useState()
    const [totalAccepted, setTotalAccepted] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0.0);

    async function logoutBackend() {
        await axios.post("/api/auth/logout")
        .then(function (response) {
            console.log("Response:  ", response);
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
    }

    function fetchProfile() {
        axios.get('/api/users/profile', { withCredentials: true })
        .then(function (response) {
            console.log(response)
            setProfile(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    function calcVals() {
        // console.log(profile);
        if (profile.claims.length !== 0) {
            profile.claims.map((claim) => {
                if (claim.status == "Approved") {
                    setTotalAccepted(totalAccepted + 1);
                    setTotalSpent((totalSpent) => { return totalSpent + parseFloat(claim.amount) });
                    // console.log(claim.amount);
                }
            })
        }
    }

    useEffect(() => {
        document.title = 'Your Profile';
        fetchProfile();
    }, [])

    useEffect(() => {
        if (!profile) {
            return;
        }
        calcVals();
    }, [profile])

    return (
        <div>
            <NavBar />
            <div className="ProfileBody">
                <h1>View Profile</h1>
                <div>
                    {profile ? (
                        profile.profile_picture ? (
                            <img className='pfp' src={'http://127.0.0.1:5000/' + profile.profile_picture} alt="pfp" />
                        ) : (
                            // ensure that even with an unset profile picture, the default picture gets displayed
                            <img className='pfp' src={'http://127.0.0.1:5000//static/profile-pictures/default.png'} alt="pfp" />
                        )
                    ) : null}
                    <p id="EmployeeName">
                        {profile ? (profile.first_name + " " + profile.last_name) : "-"}
                    </p>
                    <p id='EmployeeRole'>{profile ? (profile.role) : "-"}</p>
                </div>
                <div id='Stats'>
                    <p className="StatsTitle" id='LMETitle'>Line Manager</p>
                    <p className="cont">
                        {profile ? (
                            profile.line_manager ? (profile.line_manager) : ("-")
                        ) : "-"}
                    </p>
                    <p className="StatsTitle">Total Accepted Claims</p>
                    <p className="cont">
                        {/* 1  */}
                        {(totalAccepted !== 0) ? (totalAccepted) : "0"}
                    </p>
                    <p className="StatsTitle">Total Budget Spent</p>
                    <p className="cont">
                        {/* £49.99 */}
                        {(totalSpent !== 0.0) ? ("£" + (totalSpent / 2).toFixed(2)) : "£0"}
                    </p>
                </div>
                <NavLink to="/" id="LogoutBtnProfile" onClick={() => { logoutBackend() }}>
                    <p>Logout</p>
                </NavLink>
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