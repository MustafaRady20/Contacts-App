import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { BsPersonCircle } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaSortAmountUp } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";



import "./contactspage.css"
import Modal from "../components/Modal";
import { openModal } from '../store/modal'
const contacts = [
    {
        id: 1,
        name: "Youssef Khaled",
        email: "khaldy002@gmail.com",
        phoneNum: "+90 501 317 9633"
    },
    {
        id: 2,
        name: "Youssef Khaled",
        email: "khaldy002@gmail.com",
        phoneNum: "+90 501 317 9633"
    },
    {
        id: 3,
        name: "Youssef Khaled",
        email: "khaldy002@gmail.com",
        phoneNum: "+90 501 317 9633"
    },
    {
        id: 4,
        name: "Youssef Khaled",
        email: "khaldy002@gmail.com",
        phoneNum: "+90 501 317 9633"
    },
]
function ContactsListPage() {

    const [openSettings, setOpenSettings] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <Modal />
            <div className="contactsPage">
                <div className="userInfo">
                    <div className="userName" onClick={() => setOpenSettings(!openSettings)}>
                        <span className="avatar">
                            <BsPersonCircle />
                        </span>
                        <h3>Mostafa Rady</h3>
                    </div>
                    <ul className={`userSettingOptions ${openSettings ? "closeSettings" : ""}`}>
                        <li><Link to="#">Change Username</Link></li>
                        <li><Link to="#">Change Password</Link></li>
                    </ul>
                </div>

                <div className="contactsContainer">
                    <div className="search">
                        <div className="addAndSortContacts">
                            <Link to="#"><IoPersonAddSharp onClick={() => dispatch(openModal({ componentName: "AddNewContact" }))} /></Link>
                            <Link to="#"><FaSortAmountUp /></Link>
                        </div>
                        <div className="searchBar">
                            <input type="text" name="searchForContact" id="search" placeholder="Search here.." />
                            <MdPersonSearch className="searchIcon" />

                        </div>
                    </div>
                    <div className="contactsList">
                        {contacts.length > 0 ? contacts.map(contact => {
                            return (
                                <div className="contact-info" key={contact.id}>
                                    <div className="info">
                                        <h4 className="name">{contact.name}</h4>
                                        <h4>{contact.email}</h4>
                                        <h4>{contact.phoneNum}</h4>
                                    </div>
                                    <div className="buttons">
                                        <FaEdit className="icon" onClick={() => dispatch(openModal({ componentName: "UpdateContact", data: contact }))} />
                                        <FaTrashAlt className="icon" />
                                    </div>
                                </div>

                            )
                        }) : "no contacts to show"}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactsListPage