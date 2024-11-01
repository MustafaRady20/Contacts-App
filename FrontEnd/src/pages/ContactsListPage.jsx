import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaSortAmountUp, FaTrashAlt, FaEdit } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";

import "./contactspage.css";
import Modal from "../components/Modal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function ContactsListPage() {
    const {auth} = useAuth()
    console.log(auth)
    const axiosPrivate = useAxiosPrivate();
    const [openSettings, setOpenSettings] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [componentName, setComponentName] = useState("");
    const [modelData, setModelData] = useState({});
    const [contacts, setContacts] = useState([]);  
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddNewContact = (componentName, data) => {
        setIsOpen(!isOpen);
        setComponentName(componentName);
        setModelData(data);
    };

    // Fetch contacts
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getContacts = async () => {
            try {
                const response = await axiosPrivate.get("/contacts", {
                    signal: controller.signal,
                });
                if (isMounted) {
                    setContacts(response.data);
                }
            } catch (err) {
                if (err.name !== 'CanceledError') {
                    console.error("Failed to fetch contacts:", err);
                    navigate("/login", { state: { from: location }, replace: true });
                }
            }
        };
        getContacts();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate, location, navigate]);

    return (
        <>
            <Modal isOpen={isOpen} data={modelData} componentName={componentName} />
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
                            <Link to="#"><IoPersonAddSharp onClick={() => handleAddNewContact("AddNewContact", "")} /></Link>
                            <Link to="#"><FaSortAmountUp /></Link>
                        </div>
                        <div className="searchBar">
                            <input type="text" name="searchForContact" id="search" placeholder="Search here.." />
                            <MdPersonSearch className="searchIcon" />
                        </div>
                    </div>
                    <div className="contactsList">
                        {contacts.length > 0 ? contacts.map(contact => (
                            <div className="contact-info" key={contact.id}>
                                <div className="info">
                                    <h4 className="name">{contact.name}</h4>
                                    <h4>{contact.email}</h4>
                                    <h4>{contact.phoneNum}</h4>
                                </div>
                                <div className="buttons">
                                    <FaEdit className="icon" onClick={() => handleAddNewContact("UpdateContact", contact)} />
                                    <FaTrashAlt className="icon" />
                                </div>
                            </div>
                        )) : "No contacts to show"}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactsListPage;
