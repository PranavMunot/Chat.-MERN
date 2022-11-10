import { createContext } from "react";

const initialContext = {
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
    setUser: () => { }
}

const LoginContext = createContext(initialContext)

export default LoginContext