import { useNavigate } from "react-router-dom"
import "./signin.css"
function SignUp() {
  const navigate = useNavigate()


  return (
    <div className=' center'>
      <div className="container">
        <h1>Sign In </h1>
        <form >

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input type="text" placeholder="E-mail" id="email" />
          </div>

          <div className="field">
            <label htmlFor="pass">Password</label>
            <input type="password" id="pass" />
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