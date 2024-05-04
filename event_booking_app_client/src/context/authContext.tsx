import React, { createContext, useEffect, useState } from "react";

interface UserContextProps {
    children: React.ReactNode
}

interface loginResponse {
    userId: "",
    token: "",
    tokenExpiration: null
}

export const AuthContext = createContext<any>({})

export const AuthProvider: React.FC<UserContextProps> = ({children}: UserContextProps) => {
    const [user, setUser] = useState<loginResponse>({userId: "", token: "", tokenExpiration: null})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const updateUser = (responseData: any) => {
        setUser(responseData.data.userLogin)
    }
    

    const userLoggedIn = () => {
            if(user.token !== "") {
                setIsLoggedIn(true) 
            } 
        }
        useEffect(() => (userLoggedIn()), [user])

    


    return (
        <AuthContext.Provider value = {{user, updateUser, isLoggedIn, userLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

// export default AuthContext