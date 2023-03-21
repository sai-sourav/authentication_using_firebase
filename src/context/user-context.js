import { createContext, useState } from "react";

const userContext = createContext({
    isloggedIn : "",
    setIsloggedIn : () => {},
    token : "",
    settoken : () => {}
})

export const UserContextProvider = (props) => {
    const [isloggedIn , setIsloggedIn] = useState(false);
    const [token, setToken] = useState("")
    const updatelogin = () => {
        setIsloggedIn(prev => !prev)
    }
    const updatetoken = (token) => {
        setToken(token)
    }
    const values ={
        isloggedIn : isloggedIn,
        setIsloggedIn : updatelogin,
        token : token,
        settoken : updatetoken
    }

    return(
        <userContext.Provider value={values}>{props.children}</userContext.Provider>
    )

}

export default userContext;