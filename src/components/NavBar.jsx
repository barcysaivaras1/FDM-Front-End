import '../css/NavBar.css';
import { ViewExpensesIcon, CreateExpenseIcon, AccountNavIcon } from "../assets/Icons";
import FDMLogo from "../assets/FDMLogo.png";
import {Link, NavLink, useAsyncError} from "react-router-dom";
import httpClient from '../httpClient';
import useAuth from '../hooks/useAuth';
import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/AuthProvider';

function NavBar() {
    const { setAuth } = useAuth();
    const { auth } = useContext(AuthContext); // auth.role = 1 (employee), auth.role = 2 (Line Manager), auth.role = 4 (System admin)
    const [accountNavOpen, setAccountNavOpen] = useState(false);
    const [ style, setStyle ] = useState("account notClicked")
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

    const changeStyle = () => {
        if (style !== "account notClicked") setStyle("account notClicked");
        else setStyle("account clicked");
    };

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
            <div className='one'>
                <img src={FDMLogo} id="FDMLogo" width={80} />
                {
                    auth.role === 2 && (
                        <NavLink to="/line-manager-expenses" className="DesktopIdentifiers link">
                            <div>
                                <p>Review Expenses</p>
                            </div>
                        </NavLink>
                    )
                }

                <NavLink to="/my-expenses" className='link' id='ViewBtn'>
                    <div>
                        <ViewExpensesIcon />
                        {/* <p className="MobileIdentifiers">View</p> */}
                        <p className="DesktopIdentifiers">My Expenses</p>
                    </div>
                </NavLink>

                <NavLink to="/create-claim" className='link'>
                    <div>
                        <CreateExpenseIcon />
                        <p className="DesktopIdentifiers">Create Claim</p>
                    </div>
                </NavLink>

                <div className={style} ref={accountNavRef}>
                    <AccountNavIcon onClick={() => {setAccountNavOpen(!accountNavOpen); changeStyle();}} className='accountNavIcon' />
                    {/* <p className="MobileIdentifiers">Profile</p> */}

                    {accountNavOpen && (
                        <div className='account-dropdown'>
                            <div className='links'>
                                <Link to='/profile' className='dropdown-link'>Profile</Link>

                                <hr className='divider' />

                                <Link to='/' className='dropdown-link' onClick={() => logoutBackend()}>Logout</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </nav>

    )
}

export default NavBar;
