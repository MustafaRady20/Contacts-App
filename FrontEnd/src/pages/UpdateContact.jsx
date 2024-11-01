import React from 'react'

function UpdateContact(props) {
    return (
        <div className="addNewContactPage center">
            <div className="AddNewContainer">
                <form >
                    <h2>Update Contact</h2>
                    <div className="name">
                        <input type="text" name='contactName' id='contactName' placeholder='Full Name' value={props.data.name} onChange={(e)=> e.target.value = e.target.value}/>

                    </div>
                    <div className="email">
                        <input type="text" name="email" id="email" placeholder='E-mail' value={props.data.email} />

                    </div>
                    <div className="phone">
                        <input type="text" name="phoneNymber" id="phoneNumber" placeholder='Phone Number' value={props.data.phoneNum} />

                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateContact