import { NavLink } from "react-router-dom"
import "./mainNavBar.css"
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authContext"
export const MainNavBar = () => {
    const {isLoggedIn, setUser} = useContext(AuthContext)
   
    const loggedOut: any = () => {
          setUser({
                 userId: "", token: "", tokenExpiration: null
             })
     }


    return (
        <div className="main-nav">
            <div className="nav-title">
                <h2>Event Booking</h2>
            </div>
            <div>
                <nav className="nav-link">
                    <ul>
                        { !isLoggedIn  && 
                        <> 
                        <li>
                            <NavLink to = "/authPage">Authentication</NavLink>
                        </li>

                         <li>
                            <NavLink to = "/eventPage">Events</NavLink>
                        </li>
                        </>
                    } {isLoggedIn &&
                        <>
                         <li>
                            <NavLink to = "/eventPage">Events</NavLink>
                        </li>

                        <li>
                            <NavLink to = "/bookingPage">Bookings</NavLink>
                        </li>

                        <li>
                        <NavLink to = "/authPage" onClick={loggedOut}>Logout</NavLink>
                        </li>
                        </>
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}