import '../css/Profile.css'
import React from 'react'
import pfp from '../assets/johnpork.png';


export const Profile = () => {

    return(
        
        <div className="container">
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




