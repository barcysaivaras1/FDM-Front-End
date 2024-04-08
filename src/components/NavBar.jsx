import '../css/navbar.css';
import { ViewExpensesIcon, CreateExpenseIcon, AccountNavIcon } from "../assets/Icons";
import FDMLogo from "../assets/FDMLogo.png";
import {Link, NavLink} from "react-router-dom";
import httpClient from '../httpClient';
import useAuth from '../hooks/useAuth';
import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/AuthProvider';

function NavBar() {
    const { setAuth } = useAuth();
    const { auth } = useContext(AuthContext); // auth.role = 1 (employee), auth.role = 2 (Line Manager), auth.role = 4 (System admin)
    const [accountNavOpen, setAccountNavOpen] = useState(false);
    let accountNavRef = useRef();

    async function logoutBackend() {
        await httpClient.post("/api/auth/logout")
        .then(function (response) {
            setAuth({})
            console.log("Response:  ", response);
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
    }

    useEffect(() => {
        let handler = (event) => {
            if (!accountNavRef.current.contains(event.target)){
                setAccountNavOpen(false);
            }
        }

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);

    return (
        <nav className='navbar'>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
            </style>
            <div className='one'>
                <img src={FDMLogo} id="FDMLogo" width={80} />

                {/* All this needs now is an if statement to check whether user is a line manager - DONE :3 */}
                {
                    auth.role === 2 && (
                        <NavLink to="/line-manager-expenses" className="DesktopIdentifiers">
                            <div>
                                <p>Review Expenses</p>
                            </div>
                        </NavLink>
                    )
                }

                <NavLink to="/my-expenses" className='link'>
                    <div>
                        <ViewExpensesIcon />
                        <p className="MobileIdentifiers">View</p>
                        <p className="DesktopIdentifiers">My Expenses</p>
                    </div>
                </NavLink>

                <NavLink to="/create-claim" className='link'>
                    <div>
                        <CreateExpenseIcon />
                        <p className="DesktopIdentifiers">Create Claim</p>
                    </div>
                </NavLink>
            </div>

            <div className='account two' ref={accountNavRef}>
                <AccountNavIcon onClick={() => setAccountNavOpen(!accountNavOpen)} className='accountNavIcon' />

                {accountNavOpen && (
                    <div className='account-dropdown'>
                        <div className='links'>
                            <Link to='/profile' className='dropdown-link'>Profile</Link>
                            <Link to='/' className='dropdown-link' onClick={() => logoutBackend()}>Logout</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>

    )
}

export default NavBar;
