import React, { useState } from "react"
import "./eventList.css"

 export const EventLists:any =  (props: any) => {
    const events = props.events.map((event) => (
        
        <li className="event-list-item" key={event._id }>
                <div className="event-item">
                    <div>
                        <strong>{event.title}</strong>
                        <p>₦{event.price}</p>
                    </div>
                        <div className="event-description">
                          {props.authUserId === event.creator._id ? 
                          <span>{event.description}</span> : 
                          <button onClick = {props.showDetail.bind(this, event._id)}>view details</button>}
                         
                        </div>
                </div>   
            </li>
            
            ))

            return (
                <div>
                    <ul className="event-list" key={props.eventId}>
                         {events}
                    </ul>
                </div>
                
                )

}