import { createContext, useState } from "react";

const userContext = createContext({
    isloggedIn : "",
    setIsloggedIn : () => {},
    token : ""
})

export const UserContextProvider = (props) => {
    const [isloggedIn , setIsloggedIn] = useState(false);
    const updatelogin = () => {
        setIsloggedIn(prev => !prev)
    }
    const values ={
        isloggedIn : isloggedIn,
        setIsloggedIn : updatelogin,
        token : ""
    }

    return(
        <userContext.Provider value={values}>{props.children}</userContext.Provider>
    )

}

export default userContext;