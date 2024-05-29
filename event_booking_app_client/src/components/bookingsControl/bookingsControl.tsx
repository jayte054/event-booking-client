import React from "react"
import "./bookingsControl.css"

export const BookingsControl = props => (
    <React.Fragment>
        <div className="bookingsControl">
            <button className={props.activeOutputType === "list" ? "active" : ""} 
                    onClick={props.onChange.bind(this, "list")}>
                        List
            </button>
            <button className = {props.activeOutputType === "chart" ? "active" : ""} 
                    onClick={props.onChange.bind(this, "chart")}>
                        Chart
            </button>
        </div>
    </React.Fragment>
)