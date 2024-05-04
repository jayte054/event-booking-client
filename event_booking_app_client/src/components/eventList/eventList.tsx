import React, { useState } from "react"
import "./eventList.css"

 export const EventLists:any =  (props: any) => {
    
    const events = props.events.map((event, index) => (
        <li className="event-list-item" key={event.id ?? index}>
                <div className="event-item">
                    <div>
                        <strong>{event.title}</strong>
                        <p>₦{event.price}</p>
                    </div>
                        <div className="event-description">
                          {props.authUserId === event.creator._id ? <span>{event.description}</span>: <button>view details</button>}
                         
                        </div>
                </div>   
            </li>
            ))

    // const events = Array.isArray(props.events) ? (
    //     props.events.map((event: any, index: number) => (
    //         <li className="event-list-item" key={event.id ?? index}>
    //             <div className="event-item">
    //                 <div>
    //                     <strong>{event.title}</strong>
    //                     <p>₦{event.price}</p>
    //                 </div>
    //                 <div className="event-description">
    //                     {props.authUserId === event.creator._id ? (
    //                         <span>{event.description}</span>
    //                     ) : (
    //                         <button>view details</button>
    //                     )}
    //                 </div>
    //             </div>
    //         </li>
    //     ))
    // ) : null;

    

            return (
                <div>
                    <ul className="event-list" key={props.eventId}>
                         {events}
                    </ul>
                </div>
                
                )

}