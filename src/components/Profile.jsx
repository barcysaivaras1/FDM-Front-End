import '../css/Profile.css'
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import httpClient from '../httpClient';
import Animate_page from './Animate-page';
import Modal from './Modal';
import {AccountNavIcon} from "../assets/Icons.jsx";


export function Profile() {
    const [profile, setProfile] = useState()
    const [totalAccepted, setTotalAccepted] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0.0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();

    function fetchProfile() {
        httpClient.get('/api/users/profile')
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
                    setTotalAccepted((totalAccepted) => { return totalAccepted + 1 });
                    if (claim.currency == "€") {
                        setTotalSpent((totalSpent) => { return totalSpent + (parseFloat(claim.amount) * 0.86) });
                    }
                    else if (claim.currency == "$") {
                        setTotalSpent((totalSpent) => { return totalSpent + (parseFloat(claim.amount) * 0.79) });
                    }
                    else { // has to be claim.currency == £
                        setTotalSpent((totalSpent) => { return totalSpent + parseFloat(claim.amount) });
                    }
                    
                }
            })
        }
    }

    const validatePasswords = (e) => {
        setSuccessMessage(null);
        
        if (e.target.name === "newPassword" && e.target.value !== confirmNewPassword) {
            setErrorMessage("Passwords do not match");
        } else if (e.target.name === "confirmNewPassword" && e.target.value !== newPassword) {
            setErrorMessage("Passwords do not match");
        } else {
            setErrorMessage(null);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        httpClient.put('/api/auth/change-password', {
            old_password: oldPassword,
            new_password: newPassword
        })
        .then(function(response) {
            console.log(response);
            setErrorMessage(null);
            setSuccessMessage("Password successfully updated");
        })
        .catch(function(error) {
            if (error.response.status === 401) {
                setErrorMessage("Old password is incorrect");
            } else {
                setErrorMessage(error.response.data.error);
            }
        })
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
            <Animate_page>
            <div className="ProfileBody">
                <div id='ProfileContainer'>
                    <h1 id='ViewProfileHeader'>View Profile</h1>

                    <div className='info'>
                        {profile ? (
                            profile.profile_picture ? (
                                <img className='pfp' src={'/api/' + profile.profile_picture} alt="pfp" />
                            ) : (
                                // ensure that even with an unset profile picture, the default picture gets displayed
                                <img className='pfp' src={'/api/static/profile-pictures/default.png'} alt="Your profile picture" />
                            )
                        ) : null}
                        
                        <p id="EmployeeName">
                            {profile ? (profile.first_name + " " + profile.last_name) : "-"}
                        </p>

                        <p id='EmployeeRole'>
                            {profile ? (profile.role) : "-"}
                        </p>
                    </div>
                    <div id='Stats'>
                        <div className='stat'>
                            <p className="StatsTitle" id='LMETitle'>
                                Your Email
                            </p>
                            
                            <p className="cont">
                                {profile ? profile.email : null}
                            </p>
                        </div>

                        <div className='stat'>
                            <p className="StatsTitle" id='LMETitle'>
                                Your Line Manager
                            </p>

                            <p className="cont">
                                {profile ? (
                                    profile.line_manager ? profile.line_manager : ("-")
                                ) : "-"}
                            </p>
                        </div>
                        
                        <div className='stat'>
                            <p className="StatsTitle">
                                Total Accepted Claims
                            </p>

                            <p className="cont">
                                {/* 1  */}
                                {(totalAccepted !== 0) ? (totalAccepted) : "0"}
                            </p>
                        </div>

                        <div className='stat'>
                            <p className="StatsTitle">
                                Total Budget Spent
                            </p>

                            <p className="cont">
                                {/* £49.99 */}
                                {(totalSpent !== 0.0) ? ("£" + (totalSpent).toFixed(2)) : "£0"}
                            </p>
                        </div>

                        <div className='change-password'>
                            <button onClick={() => setIsModalOpen(true)} className='modal-button'>Change password</button>

                            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                <form onSubmit={handleSubmit} className='change-password-form'>
                                    <div className='row'>
                                        <label>Old Password</label>
                                        <input 
                                            type="password"
                                            name="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className='row'>
                                        <label>New Password</label>
                                        <input 
                                            type="password"
                                            name="newPassword"
                                            value={newPassword}
                                            onChange={(e) => {setNewPassword(e.target.value); validatePasswords(e)}}
                                            required
                                        />
                                    </div>

                                    <div className='row'>
                                        <label>Confirm New Password</label>
                                        <input 
                                            type="password"
                                            name="confirmNewPassword"
                                            value={confirmNewPassword}
                                            onChange={(e) => {setConfirmNewPassword(e.target.value); validatePasswords(e)}}
                                            required
                                        />
                                    </div>

                                    <p className='success-message'>{successMessage}</p>
                                    <p className='error-message'>{errorMessage}</p>
                                    <button className='submit-button'>Update Password</button>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            </Animate_page>
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