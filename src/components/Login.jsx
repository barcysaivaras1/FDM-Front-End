import { useState, useEffect } from 'react'
import '../css/Login.css'
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';

function Login() {
    const [un, setUn] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    document.title = "Login"

    async function handleSubmit(e) {
        e.preventDefault();

        await httpClient.post("/api/auth/login", {
                username: un,
                password: pw
            },
        )
        .then(function (response) {
            console.log("Response:  ", response);
            navigate("/profile");
        })
        .catch(function (error) {
            console.log("Error: ", error);
            alert("Incorrect username or password");
        })
    }

    useEffect(() => {
      document.title = 'Login';
    }, [])
    

    return (
        <div className='loginContainer'>
            <legend className='loginLegend'>Login</legend>
            <form className='loginForm' onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' className='loginField un' required
                    value={un}
                    onChange={(e) => { setUn(e.target.value) }}
                />
                <input type="password" placeholder='Password' className='loginField pw' required
                    value={pw}
                    onChange={(e) => { setPw(e.target.value) }}
                />
                <button className='loginSubmit'>Login</button>
            </form>
            <a href='https://careers.fdmgroup.com/forgotten-password.aspx' target='_blank' rel='noreferrer' className='forgor'>
                Forgot your password?
            </a>
        </div>
    )
}

export default Login;



