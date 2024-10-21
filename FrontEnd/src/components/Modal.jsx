import React from 'react'
import AddNewContact from '../pages/AddNewContact'
import UpdateContact from '../pages/UpdateContact'
import "./modal.css"

import { closeModal } from '../store/modal'
import { useSelector, useDispatch } from "react-redux"

function Modal() {
    const dispatch = useDispatch()


    const { isOpen, data, componentName } = useSelector(state => state.modal)

    const components = { AddNewContact, UpdateContact }
    let renderedComponent;

    if (componentName) {
        let SelectedComponent = components[componentName]
        if (SelectedComponent) {
            renderedComponent = <SelectedComponent data={data} />
        }
    }
    return (

        <div className={isOpen ? '' : "hide"}>

            <div className="backdrop" onClick={() => dispatch(closeModal)} />
            <div className="modal" >
                {renderedComponent}
            </div>
        </div>

    )
}

export default Modal