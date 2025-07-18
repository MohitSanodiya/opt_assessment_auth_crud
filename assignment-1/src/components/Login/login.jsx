import React from 'react'
import './login.css'

const login = () => {
  return (
    <div>
       <div id="login">
        <h2>Login</h2>
        <input type="text" placeholder="username" id="fm" />
        <i id="i1" className="fa-solid fa-user"></i>

        <input type="text" placeholder="passward" id="fm" />
        <i id="i2" className="fa-solid fa-lock"></i>

        <div id="option">
          <input type="checkbox" name="" id="input" />
          <p>Remeber me</p>
          <p>
            <a id="register" href="#">Forgot passward?</a>
          </p>
        </div>

        <button>Login</button>

        <div id="op">
          <p id="ctacc">
            Don't have an Account?
            <a id="register" href="#">Register</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default login
