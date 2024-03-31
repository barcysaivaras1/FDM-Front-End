import '../css/Profile.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {
    const [profile, setProfile] = useState()
    async function fetchProfile() {
        await axios.get('/api/users/profile')
        .then(function (response) {
            console.log(response)
            setProfile(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    useEffect(() => {
        fetchProfile()
    }, [])
  return (
    <div>{JSON.stringify(profile)}</div>
  )
}

export default Profile