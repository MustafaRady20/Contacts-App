import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { MdErrorOutline } from "react-icons/md";
import { GrValidate } from "react-icons/gr";
import { BiSolidShow } from "react-icons/bi";
import "./singup.css"


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUp() {
    const navigate = useNavigate()


    const [userName, setUserName] = useState();
    const [validName, setValidName] = useState(false)
    const userNameRef = useRef()

    const [email, setEmail] = useState();
    const [validEmail, setValidEmail] = useState(false)

    const [pass, setpass] = useState();
    const [validPass, setValidPass] = useState(false)
    const [confirmPass, setConfirmPass] = useState()
    const [validMatch, setValidMatch] = useState(false);


    const [checkBoxValue, setcheckBoxValue] = useState(false);

    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    useEffect(() => {
        userNameRef.current.focus()
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(userName))
    }, [userName])


    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPass(PWD_REGEX.test(pass))
        setValidMatch(pass === confirmPass)
    }, [pass, confirmPass])


    const showPassHandler = () => {
        setShowPass(!showPass)
    }

    const showConfirmPassHandler = () => {
        setShowConfirmPass(!showConfirmPass)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        if (checkBoxValue && validEmail && validPass && validName && validMatch) {

            const response = await axios.post("http://localhost:5000/api/contacts/", {
                name: userName,
                email,
                password: pass,

            })
            console.log(response)


        } else {
            alert("Something went wrong...!")
        }

    }

    useEffect(() => {
        console.log(checkBoxValue)

    }, [checkBoxValue])
    return (
        <div className='singup center'>
            <div className="container">
                <h1>Sing Up</h1>
                <form onSubmit={onSubmitForm} >
                    <div className="field">
                        <label htmlFor="username">
                            User Name
                            <MdErrorOutline className={validName || !userName ? "hide" : "invalid"} />
                            <GrValidate className={validName && userName ? "valid" : "hide"} />
                        </label>
                        <input type="text" placeholder="Username" id="username" ref={userNameRef} onChange={(e) => setUserName(e.target.value)} />
                        <div className={userName && !validName ? "instructions" : "hide"}>
                            <ul>
                                <li>4 to 24 characters.</li>
                                <li>Must begin with a letter.</li>
                                <li>Letters, numbers, underscores, hyphens allowed.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="email">
                            E-mail
                            <MdErrorOutline className={validEmail || !email ? "hide" : "invalid"} />
                            <GrValidate className={validEmail ? "valid" : "hide"} />
                        </label>
                        <input type="text" placeholder="E-mail" id="email" onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    <div className="field">
                        <label htmlFor="pass">Password</label>
                        <div className="show">
                            <BiSolidShow className="showPassbtn" onClick={showPassHandler} />
                        </div>
                        <input type={showPass ? "text" : "password"} id="pass" onChange={e => setpass(e.target.value)} style={{ position: "relative" }} />
                        <div className={pass && !validPass ? "instructions" : "hide"}>
                            <ul>
                                <li>8 to 24 characters.</li>
                                <li>Must include uppercase and lowercase letters, a number and a special character.</li>
                                <li>Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span>
                                    <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="confirm-pass">Confirm Password</label>
                        <BiSolidShow className="showConfirmPassbtn" onClick={showConfirmPassHandler} />
                        <input type={showConfirmPass ? "text" : "password"} id="confirm-pass" onChange={e => setConfirmPass(e.target.value)} />
                        <p id="confirmnote" className={confirmPass && !validMatch ? "instructions" : "hide"}>

                            Must match the first password input field.
                        </p>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" name="terms" id="terms" onChange={e => setcheckBoxValue(!checkBoxValue)} />
                        <label htmlFor="terms">By signing up you are agreeing <span>The Terms of service and Privacy Policy</span></label>
                    </div>
                    <div className="field">
                        <button type="submit">Sign Up</button>
                    </div>

                    <div className="redirect">
                        <p>Already have an account?<span onClick={() => navigate("/")}>Sign In</span></p>

                    </div>

                </form>
            </div >
        </div >
    )
}

export default SignUp