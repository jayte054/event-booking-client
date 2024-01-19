import React, { useState } from "react"
import "./auth.page.css"
export const AuthPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignIn, setIsSignIn] = useState(true)

    const switchModeHandler = () => {
        setIsSignIn(!isSignIn)
    }

    const submitHandler = async (e: any) => {
        e.preventDefault()
        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        console.log(email, password)   
        
        let requestBody = {
            query: `
                query {
                    userLogin(email: "${email}", password: "${password}") {
                        userId,
                        token,
                        tokenExpiration
                    }
                }
            `
        }
        
        if(!isSignIn) {
            requestBody = {
                query: `
                    mutation {
                        createUser(UserInput: {email: "${email}", password: "${password}"}) {
                            id,
                            email,
                        }
                    }
                `
            }
        }
       

        try {
            const response = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json()
            {!isSignIn ?  console.log(responseData.data.createUser, "created successfully") : console.log(responseData.data.userLogin, "successfully signed in")}
            return response
        }catch(error) {
            throw error
        }
       
    }

   

    return(
        <div className="auth-main">
            <h2>My Authentication Page</h2>
            <div className="auth-body">
                <div className="signup">
                <h3>{!isSignIn ? "Sign up" : "Sign in"}</h3>
                <form className="auth-form">
                    <div className="auth-param">
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                               id="email" 
                               placeholder="email" 
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="auth-param">
                        <label htmlFor="password ">Password</label>
                        <input type="password" 
                               id="password" 
                               placeholder="password"
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="auth-button">
                        <button type="submit" onClick = {(e) => submitHandler(e)}>Submit</button>
                        <button type="button" onClick={switchModeHandler}>Switch to {isSignIn ? "Sign Up": "Sign In"}</button>
                    </div>
                    
                </form>
                </div>
            </div>
        </div>
    )
}