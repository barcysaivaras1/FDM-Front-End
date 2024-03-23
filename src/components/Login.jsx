import React, {useState} from 'react'
import '../css/Login.css'

function login () {
    const [un, setUn] = useState("");
    const [pw, setPw] = useState("");

    document.title = "Login"

    function handleSubmit (e) {
        e.preventDefault();
        // stuff that will handle the inputs


        // for now it will just alarm the user with the
        // inputted data fo8r debugging puproses
        alert(`Successful submit. \nUsername: ${un} \nPassword: ${pw}`);
    }
    
    return (
        <div className='loginContainer'>
            <legend className='loginLegend'>Login</legend>
            <form className='loginForm' name='loginForm' onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' className='loginField un' required 
                    value={un}
                    onChange={(e) => {setUn(e.target.value)}}
                />
                <input type="password" placeholder='Password'className='loginField pw' required
                    value={pw}
                    onChange={(e) => {setPw(e.target.value)}}
                />
                <button className='loginSubmit'>Login</button>
            </form>
            <p className='forgor'>Forgot your password?</p>
        </div>
    )
}

export default login;