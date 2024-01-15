import React, { useState } from "react";
import './register.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Register() {

    // Hook for saving the User-Input-Values
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // Hook for accessing the React-Router-history or navigating to specific URL
    const navigate = useNavigate();
    let handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/register', { username, email, password })
            .then((res) => {
                console.log(res)
                navigate('/login')
            })
            .catch((err) => console.log(err))

        setUsername("");
        setEmail("");
        setPassword("");
    }


    return (
        <div id="window" >
            <div id="container">
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    {/* Username Input*/}
                    <input
                        name="username"
                        value={username}
                        className="input"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                    >
                    </input>
                    <br />
                    {/* E-Mail Input*/}
                    <input
                        name="email"
                        value={email}
                        className="input"
                        placeholder="E-Mail"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    >
                    </input>
                    <br />
                    {/* Password Input*/}
                    <input
                        type="password"
                        name="password"
                        value={password}
                        className="input"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                    >
                    </input>
                    <br />

                    {/* Submit Button*/}
                    <button type="submit" id="submit-btn">Sign Up</button>
                    <p>Already have an Account?<Link to="/login">Sign In</Link></p>
                </form>

            </div>
        </div>
    )
}