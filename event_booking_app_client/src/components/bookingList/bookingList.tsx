import React from "react";
import "./bookingList.css"

export const BookingList: any = props => {
  const booking = props.bookings.map(booking => (
        <li className = "list-item" key = {booking._id}>
            <div className="list-data">
                <div>
                    <strong>{booking.event.title}</strong>
                    <p>{new Date(booking.event.date).toLocaleDateString()}</p>
                </div>
                    <div className="list-action">
                        <button onClick={props.onDelete.bind(this, booking._id)}>Cancel</button>
                    </div>
            </div>
            
        </li>
  ))

  return (
    <div className="booking-list">
        <ul key={props.bookings._id}>
        {booking}

        </ul>
    </div>
  )
  }