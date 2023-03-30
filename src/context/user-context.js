import { createContext, useState } from "react";

const userContext = createContext({
    isloggedIn : "",
    setIsloggedIn : () => {}
})

export const UserContextProvider = (props) => {
    const [isloggedIn , setIsloggedIn] = useState(localStorage.getItem('token') === null ? false : true);
    const updatelogin = () => {
        setIsloggedIn(prev => !prev)
    }

    const values ={
        isloggedIn : isloggedIn,
        setIsloggedIn : updatelogin,
    }

    return(
        <userContext.Provider value={values}>{props.children}</userContext.Provider>
    )

}

export default userContext;