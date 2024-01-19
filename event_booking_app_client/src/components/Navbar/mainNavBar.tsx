import { NavLink } from "react-router-dom"
import "./mainNavBar.css"
import React from "react"
export const MainNavBar = () => {

    return (
        <div className="main-nav">
            <div className="nav-title">
                <h2>Event Booking</h2>
            </div>
            <div>
                <nav className="nav-link">
                    <ul>
                        <li>
                            <NavLink to = "/authPage">Authentication</NavLink>
                        </li>
                        <li>
                            <NavLink to = "/eventPage">Events</NavLink>
                        </li>
                        <li>
                            <NavLink to = "/bookingPage">Bookings</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}