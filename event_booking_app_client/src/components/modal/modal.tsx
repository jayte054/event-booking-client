import React from "react"
import "./modal.css"
export const Modal = (props) => {

    return (
        <div className="modal"> 
            <header className="modal-header">
               <h1>{props.title}</h1> 
            </header> 
            <section className="modal_content">
                {props.children}
            </section>
            <section className="modal_actions">
                {props.canCreate && <button className="modal-button" 
                                            type="button" 
                                            onClick={props.onCreate}
                                            >
                                                {props.confirmText}
                                    </button>}
                {props.canCancel && <button className="modal-button" 
                                            type="button" 
                                            onClick={props.onCancel}
                                            >
                                                Cancel
                                    </button>}
            </section>
        </div>
    )
    
}