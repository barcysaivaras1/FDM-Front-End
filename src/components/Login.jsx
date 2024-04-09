import { useState, useEffect } from 'react'
import '../css/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';
import Animate_page from './Animate-page';
import useAuth from '../hooks/useAuth';

function Login() {
    const [un, setUn] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();
    const { setAuth } = useAuth();

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
            setAuth({ user: response.data.user, role: response.data.role })
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
        <Animate_page>
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
            
            <Link to='/forgot-password' className='forgor'>Forgot your password?</Link>
        </div>
        </Animate_page>
    )
}

export default Login;



