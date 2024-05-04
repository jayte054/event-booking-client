import React, { useContext, useEffect, useState } from "react"
import { Modal } from "../components/modal/modal"
import "./event.page.css"
import { useNavigate } from "react-router-dom"
import { Backdrop } from "../components/backdrop/backdrop"
import { AuthContext } from "../context/authContext"
import { EventLists } from "../components/eventList/eventList"

export const EventPage = () => {
    const [createEvent, setcreateEvent] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [date, setDate] = useState("")
    const [events, setEvents] = useState<any>([])
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    const token = user.token
    const userId = user.userId

    const openModal = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setcreateEvent(true)
    }

    const onCreate = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        setcreateEvent(false)

        if(!token){
            console.log("user not authenticated")
            return
        }

        if(title.trim().length === 0 ||
           price <= 0 ||
           date.trim().length=== 0 ||
           description.trim().length === 0
            )
        return;
        const event = {
            title,
            price: price,
            date,
            description,
        }

        const requestBody = {
            query: `
            mutation {
                createEvent(EventInput: {title: "${event.title}", price: ${event.price}, date: "${event.date}", description: "${event.description}" }) {
                    title,
                    price,
                    date,
                    description,
                }
            }
            `
        }
        try {
            const response = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            const responseData = await response.json();
            if (responseData.errors) {
                console.log("Error:", responseData.errors[0].message);
            } else {
                const { createEvent } = responseData.data;

                setEvents(prevState => {
                    const updatedEvents = [...prevState]
                    console.log(updatedEvents)
                    updatedEvents.push({
                        // _id: createEvent._id,
                        title: createEvent.title,
                        description: createEvent.description,
                        date: createEvent.date,
                        price: createEvent.price,
                        creator: {
                            _id: userId
                        }
                    })
                    return updatedEvents
                })

                if (createEvent) {
                    console.log("Event created successfully:", createEvent);
                } else {
                    console.log("Event creation failed:", responseData.data);
                }
            }
            return responseData;
        }catch(error){
            console.log(error.message)
            throw error
        }
    }
    
    useEffect(() => {
        const fetchEvents = async() => {
            const requestBody = {
                query: `
                    query {
                        getEvents{
                            title,
                            price,
                            date,
                            description,
                            creator{
                                _id,
                                email
                            }
                        }
                    }
                `
            }
    
            try{
                const response = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
    
                const responseData = await response.json()
                console.log(responseData)
                setEvents(responseData.data.getEvents)
                if (responseData.errors) {
                    console.log("Error:", responseData.errors[0].message);
                } else {
                    const { getEvents } = responseData.data;
                    if (getEvents) {
                        console.log("Event fetched successfully:", getEvents);
                    } else {
                        console.log("Event not fetched successfully:", responseData.data);
                    }
                }
                return responseData;
            }catch(error){
                console.log(error)
            }
        }
        fetchEvents()
    }, [])



    const onCancel = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setcreateEvent(false)
    }


    return (
        <div className="event-body">
            <h2>My Event Page</h2>
            {createEvent && <Backdrop />}
            {createEvent && 
            <Modal title="Create Events" 
                   canCreate 
                   canCancel 
                   onCreate= {onCreate} 
                   onCancel = {onCancel}
            >
                <form className="event-form">
                    <label htmlFor="title">Title</label>
                    <input type="text" 
                           placeholder="Title"
                           id="title"
                           onChange= {(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="price"> Price </label>
                    <input type="number"
                           placeholder="price"
                           id="price"
                           onChange= {(e) => setPrice(parseInt(e.target.value))}
                    />
                    <label htmlFor="date">Date</label>
                    <input  type="date"
                            placeholder="date"
                            id="date"
                            onChange= {(e) => setDate(e.target.value)}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" 
                              rows={4}
                              cols={50}
                              placeholder="Description"
                              onChange={(e)=> setDescription(e.target.value)}></textarea>
                </form>
            </Modal>}
            <div className="event-c">
            <div className = "event-button">
                <p>Click To Create Event</p>
            <button type="button" onClick= {openModal}>Create Event</button>
            </div>
            </div>
              <EventLists key={events.id}
                          events = {events}
                          authUserId = {userId}
                          eventId = {events.id} 
                          eventTitle = {events.title} 
                          eventDescription = {events.description}
                          eventPrice = {events.price}
              />
            
        </div>
    )
}