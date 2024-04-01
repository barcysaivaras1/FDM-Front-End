import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Profile.css"
import NavBar from "./NavBar";
import { getApiURL } from './api';


export function Profile() {
    const [profile, setProfile] = useState()
    function fetchProfile() {
        axios.get(getApiURL('/users/profile'), { withCredentials: true })
        .then(function(response) {
            setProfile(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    return (
        <div>
            <NavBar/> 
            <div id="ProfileBody">
            <p>Hello Profile World!</p>
            <div>{JSON.stringify(profile)}</div>
            </div>
        </div>
    )
}