import httpClient from "../httpClient.js";
import { useState, useEffect } from "react";
import NavBar from "./NavBar.jsx";

import '../css/Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        httpClient.get('/api/users/')
            .then(function(response){
                setUsers(response.data.users);
            })
            .catch(function(error){
                console.log(error);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <NavBar />

            <div className='admin'>
                <div className='admin-container'>
                    <table>
                        <thead>
                            <tr className="header-row">
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.username}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Admin;