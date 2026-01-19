import { useContext, createContext, useState, useEffect } from "react";
import { axiosInstance } from '../../api/axios'

import { Box, CircularProgress } from '@mui/material';



const AuthContext = createContext(null);


// provider component
export const AuthProvider = function ({ children }) {

    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLogIn] = useState(false);

    async function getUserFromCookie() {
        await axiosInstance.get('/getUser')
            .then(({ data }) => {
                setUser(data);
                setLogIn(true)

            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // token implimentation
    useEffect(() => {
        getUserFromCookie()
    }, [])


    // TODO: impliment login processs here 
    const login = async (loginData) => {
        try {
            const response = await axiosInstance.post("/login", loginData);
            if (!response?.data?.success) {
                throw new Error(response.data.message || 'Login failed');
            }
            if (response?.data?.success) {
                setUser(response?.data);
                setLogIn(true);
            }
            return response?.data?.success;
        } catch (error) {
            throw error;
        }
    }

    const signUp = async (signUpData) => {
        try {
            const response = await axiosInstance.post("/signup", signUpData);
            if (!response?.data?.success) {
                throw new Error(response.data.message || 'Signup failed');
            }
            if (response?.data?.success) {
                setUser(response?.data);
                setLogIn(true);
            }
            return response?.data?.success;
        } catch (error) {
            throw error;
        }
    }

    // logout
    const logout = async () => {
        await axiosInstance.get('/logout')
            .then((data) => {
                setLogIn(false);
                setUser(null)
            })
            .catch((error => {
                console.log(error.response.status, error.response.data);
            }))
    }



    return (
        <AuthContext.Provider value={{ isAuthenticated: isLoggedIn, user, login: login, signUp: signUp, logout: logout }}>
            {isLoading ? (
                <Box sx={{ display: 'flex', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress color='primary' />
                </Box>
            ) : children}
        </AuthContext.Provider>
    )

}

// custom auth hook

const useAuth = () => (useContext(AuthContext));
export default useAuth;
