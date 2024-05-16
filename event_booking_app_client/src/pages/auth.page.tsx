import React, { useContext, useState } from "react"
import "./auth.page.css"
import { AuthContext } from "../context/authContext"
import { useNavigate } from "react-router-dom"


export const AuthPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignIn, setIsSignIn] = useState(true)
    const {updateUser } = useContext(AuthContext)


    const navigate = useNavigate()

    const switchModeHandler = () => {
        setIsSignIn(!isSignIn)
    }

    const CreateUser = async(e: any) => {
        e.preventDefault()

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        const requestBody = {
            query: `
                mutation createUser($email: String!, $password: String!){
                    createUser(UserInput:{email: $email, password: $password}) {
                        id,
                        email
                    }
                }
            `,
            variables: {
            email: email,
            password: password,
        }
    };

        try{
            const response = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response)
            const responseData = await response.json()
            console.log(responseData.json)
            if (responseData.data && responseData.data.createUser) {
                console.log(`user ${email} created successfully`);
            }
            switchModeHandler()
            return responseData
        }catch(error){
            console.log(error)
            throw error
        }
    }

    const SignIn = async (e: any) => {
        e.preventDefault()
        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        
        let requestBody = {
            query: `
                query userLogin($email: String!, $password: String!){
                    userLogin(email: $email, password: $password) {
                        userId,
                        token,
                        tokenExpiration
                    }
                }
            `,
            variables: {
                email: email,
                password: password
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
            await updateUser(responseData)
            console.log(responseData.data.userLogin, "successfully signed in")
            navigate("/eventPage")
            return response
        }catch(error) {
            console.log(error)
            throw error
        }
       
    }

   const submitHandler = async(e:any) => {
    e.preventDefault()
    if(!isSignIn) {
       await CreateUser(e)
    } else {
         SignIn(e)
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