import React, { useState } from "react";
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Register() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        axios.defaults.withCredentials = true;
        e.preventDefault();
        axios.post("http://localhost:5000/login", { email, password })
            .then(res => {
                console.log(res);
                if (res.data.Login === true) {
                    navigate("/");
                } else {
                    alert("couldn't login")
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div id="window" >
            <div id="container">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>

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
                    <button type="submit" id="submit-btn">Sign In</button>
                    <p>You don't have an Account yet?<Link to="/Register">Sign Up</Link></p>
                </form>

            </div>
        </div >
    )
}