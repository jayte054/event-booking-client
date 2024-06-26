import React, { useEffect, useState, useContext  } from "react"
import { useNavigate } from "react-router-dom"
import "./booking.page.css"
import { AuthContext } from "../context/authContext"
import { Spinner } from "../components/spinner/spinner"
import { BookingList } from "../components/bookingList/bookingList"
import { BookingsChart } from "../components/bookingsChart/bookingsChart"
import { BookingsControl } from "../components/bookingsControl/bookingsControl"

export const BookingPage = () => {
    const [bookings, setBookings] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [outputType, setIsOutputType] = useState("list")
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    const {token} = user

    useEffect(() => {
        setIsLoading(true)
        const fetchBookings = async() => {
            const requestbody = {
                query: `
                    query {
                        getBookings{
                            _id,
                            event{
                                title
                                description
                                date,
                                price
                            }
                        }
                    }
                `
            }

            try{
                const response = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    body: JSON.stringify(requestbody),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    }
                })
                
                console.log(response)
                const responseData = await response.json()
                console.log(responseData.data)
                setBookings(responseData.data.getBookings)
                setIsLoading(false)
                console.log(bookings)
                // return responseData.data.getBookings
            
            }catch(error){
                console.log(error)
                setIsLoading(false)
            }
        } 
        fetchBookings()
    }, [token])

    console.log(bookings)

    // const booking: any =  bookings.map(booking => (
    //     <ul key={booking._id}>
    //                     <li>
    //                         {booking.event.title} ..... {booking.event.description}
    //                     </li>
    //                     <span>{new Date(booking.event.date).toLocaleDateString()}</span>
    //                 </ul>
    // )
    // )

        const cancelBookingHandler = async(bookingId) => {
            setIsLoading(true)
            console.log(bookingId)
            const requestBody = {
                query: `
                    mutation{
                        cancelBooking(bookingId: "${bookingId}") {
                            title,
                            description
                        }
                    }
                `
            }

            try{
                const response = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        "Content-Type":"application/json",
                        "Authorizarion": "Bearer " + token
                    }
                })
                    console.log(response)
                    const responseData = await response.json()
                    console.log(responseData)
                    setBookings(prevState => {
                        const updatedBookings = prevState.filter(booking => {
                          return  booking._id !== bookingId
                        })
                        return updatedBookings
                    })
                    setIsLoading(false)
                    console.log(responseData)
                    return responseData
            }catch(error){
                console.log(error)
                setIsLoading(false)
            }
           
        }   

        useEffect(() => {
            if(!token) {
                navigate("/authPage")
            }
        },[token, navigate])

        // const changeOutputType = () => {
        //     if( outputType === "list") {
        //         return outputType
        //     }else {
        //       return  setIsOutputType("chart")
        //     }
        // }

        const changeOutputType = (type) => {
            setIsOutputType(type);
          };


        const ContentData = () => {
            if (isLoading) {
              return <Spinner />;
            } else {
              return (
                <React.Fragment>
                  <BookingsControl activeOutputType = {outputType} 
                                   onChange = {changeOutputType} 
                    />
                  <div>
                    {outputType === "list" ? (
                      <BookingList bookings={bookings} onDelete={cancelBookingHandler} />
                    ) : (
                      <BookingsChart bookings={bookings} />
                    )}
                  </div>
                </React.Fragment>
              );
            }
          };
    

    return token ? (
            <div className="booking-body">
                <h2>My booking page</h2>
                    {ContentData()}
                    {/* {isLoading ?( <Spinner />) : ( 
                    <div>            
                        <BookingList bookings = {bookings} onDelete = {cancelBookingHandler}/>
                    </div>) } */}
            </div>
        
    ): null
}

// function elseif(arg0: boolean) {
//     throw new Error("Function not implemented.")
// }

