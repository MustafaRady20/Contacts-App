import React from 'react'

function AddNewContact() {
    return (
        <div className="addNewContactPage center">
            <div className="AddNewContainer">
                <form >
                    <h2>Add Contact</h2>
                    <div className="name">
                        <input type="text" name='contactName' id='contactName' placeholder='Full Name' />

                    </div>
                    <div className="email">
                        <input type="text" name="email" id="email" placeholder='E-mail' />

                    </div>
                    <div className="phone">
                        <input type="text" name="phoneNymber" id="phoneNumber" placeholder='Phone Number' />

                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddNewContact