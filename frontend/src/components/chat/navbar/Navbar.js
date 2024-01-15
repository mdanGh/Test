import './navbar.css'
import React, { useContext, useState } from 'react'
//import axios from 'axios';
import { SocketContext } from '../../../socket';


export default function Navbar() {

    const socket = useContext(SocketContext);

    //const [friendToAdd, setFriendToAdd] = useState()

    let handleClick = function () {



    };

    return (
        <nav>
            <div id='addBtnDiv'>

                <button id='addFriendsBtn' onClick={handleClick}>
                    +
                    <p className="addFriendsBtnTag">Add Friends</p>
                </button>
                <div className='addContainer'> adde deine Freunde</div>
            </div>
        </nav>
    )
}