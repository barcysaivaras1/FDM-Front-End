import { useState, useEffect } from 'react'
import '../css/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';
import useAuth from '../hooks/useAuth';
import '../css/ForgotPassword.css'

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    document.title = "Login"

    async function handleSubmit(e) {
        e.preventDefault();

        // await httpClient.post("/api/auth/request-password-reset", {
        //         email: email
        //     },
        // )
        // .then(function (response) {
        //     console.log("Response:  ", response);
        // })
        // .catch(function (error) {
        //     console.log("Error: ", error);
        // })
    }

    useEffect(() => {
      document.title = 'Reset password';
    }, [])
    

    return (
        <div className='resetPasswordContainer'>
            <legend className='resetPasswordLegend'>Request password reset</legend>
            <form className='resetPasswordForm' onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' className='resetPasswordField' required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <button className='resetPasswordSubmit'>Request</button>
            </form>

            <Link to='/' className='forgor'>Go back to the login page here</Link>
        </div>
    )
}

export default ForgotPassword;



