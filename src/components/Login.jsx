import React, {useState} from 'react'
import '../css/Login.css'
import axios from 'axios';

function login () {
    const [un, setUn] = useState("");
    const [pw, setPw] = useState("");

    document.title = "Login"

    async function handleSubmit (e) {
        e.preventDefault();
        // stuff that will handle the inputs
        await axios.post(
            'http://127.0.0.1:5000/auth/login', 
            { 
                username: un,
                password: pw
            }
        )
        .then(function(response){
            console.log(response)
        })

        // for now it will just alarm the user with the
        // inputted data fo8r debugging puproses
        alert(`Successful submit. \nUsername: ${un} \nPassword: ${pw}`);
    }
    
    return (
        <div className='loginContainer'>
            <legend className='loginLegend'>Login</legend>
            <form className='loginForm' onSubmit={handleSubmit}>
                <input name="username" type="text" placeholder='Username' className='loginField un' required 
                    value={un}
                    onChange={(e) => {setUn(e.target.value)}}
                />
                <input name="password" type="password" placeholder='Password'className='loginField pw' required
                    value={pw}
                    onChange={(e) => {setPw(e.target.value)}}
                />
                <button className='loginSubmit'>Login</button>
            </form>
            <a href='https://careers.fdmgroup.com/forgotten-password.aspx' target='_blank' rel='noreferrer' className='forgor'>
                Forgot your password?
            </a>
        </div>
    )
}

export default login;