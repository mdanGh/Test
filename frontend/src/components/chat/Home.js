import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './home.css';
import Navbar from './navbar/Navbar'

export default function Home() {

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [name, setName] = useState();
    useEffect(() => {
        axios.get("http://localhost:5000/")
            .then(res => {
                if (res.data.valid) {
                    setName(res.data.ID);
                    console.log(name)
                } else {
                    console.log("not authenticated");
                    navigate("/login");
                }
            })
            .catch(err => console.log(err));
    });

    return (
        <div id="chatFlex">
            <div id="chatCon">
                <Navbar></Navbar>
                <div id="sidebarCon">
                    {name}
                    <div id="leftCol"></div>
                </div>

            </div>
        </div>
    )
}