import '../css/Profile.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getApiURL } from './api'

export function Profile() {
    const [profile, setProfile] = useState()
    async function fetchProfile() {
        await axios.get(getApiURL("/users/profile")).then(function(response) {
            console.log(`USER PROFILE RESPONSE: `, response);
            setProfile(response.data);
        }).catch(function (error) {
            console.log(`USER PROFILE ERROR: `, error);
        });
    }
    useEffect(() => {
        fetchProfile()
    }, [])
  return (
    <div>{JSON.stringify(profile)}</div>
  )
}

export default Profile;