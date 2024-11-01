import React, { useState } from 'react'
import AddNewContact from '../pages/AddNewContact'
import UpdateContact from '../pages/UpdateContact'
import "./modal.css"



function Modal({componentName,isOpen,data}) {

    const [isopen,setIsOpen]=useState(isOpen)

    const components = { AddNewContact, UpdateContact }
    let renderedComponent;

    if (componentName) {
        let SelectedComponent = components[componentName]
        if (SelectedComponent) {
            renderedComponent = <SelectedComponent data={data} />
        }
    }
    return (

        <div className={isopen ? '' : "hide"}>

            <div className="backdrop" onClick={() => setIsOpen(!isopen)} />
            <div className="modal" >
                {renderedComponent}
            </div>
        </div>

    )
}

export default Modal