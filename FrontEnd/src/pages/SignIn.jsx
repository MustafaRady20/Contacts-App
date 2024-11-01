import { useNavigate } from "react-router-dom"
import "./signin.css"
import { useContext, useState } from "react"
import AuthContext from "../context/authProvider"

import axios from "../api/axios"
import useLocalStorage from "../hooks/useLocalStorage"
function SignUp() {

  const navigate = useNavigate()

  const [email, setEmail] =  useLocalStorage("email","") //useState("")
  const [password, setpassword] = useState("")

  const { setAuth } = useContext(AuthContext)


  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post("auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      const accessToken = response?.data?.accessToken
      const role = response?.data?.roles
      setAuth({accessToken,role})
      console.log(role,accessToken)
      navigate("/contacts")
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className=' center'>
      <div className="container">
        <h1>Sign In </h1>
        <form onSubmit={handleLogin}>

          <div className="field">
            <label htmlFor="email" >E-mail</label>
            <input type="text" placeholder="E-mail" id="email" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="pass" >Password</label>
            <input type="password" id="pass" placeholder="*******" onChange={(e) => setpassword(e.target.value)} />
          </div>

          <div className="field">
            <button type="submit">Sign In</button>
          </div>

          <div className="links">
            <div className="checkbox">
              <input type="checkbox" name="rememberme" id="rememberme" />
              <label htmlFor="rememberme">Remember Me </label>
            </div>

            <div>
              <a href="#s">forget password ?</a>
            </div>

          </div>
          <div className="redirect">
            <p>Don’t have an account?<span onClick={() => navigate("/sign-up")}> Create new one!?</span></p>

          </div>

        </form>
      </div>
    </div>
  )
}

export default SignUp