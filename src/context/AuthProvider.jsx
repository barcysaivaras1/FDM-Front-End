import { createContext, useEffect, useState } from "react";
import httpClient from '../httpClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await httpClient.get('/api/auth/me');
                setAuth({ user: response.data.user, role: response.data.role });
            } catch (error) {
                console.log('Not logged in')
            } finally {
                setLoading(false);
            }
        }

        fetchDetails();
    }, [])

    if (loading) {
        return <div></div>;
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;