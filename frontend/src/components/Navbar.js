
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentDataContext from '../Context/StudentDataContext'
import UserContextProvider from '../Context/UserContextProvider'
import "./styles/Navbar.css"
const Navbar = () => {
    const userName = localStorage.getItem("userName")

    const Navigate = useNavigate()

    return (
        <div className="navbarContainer">
            <div className="welcomeMssg">
                <h2>{userName}</h2>
            </div>
            <div className="logo">
                <h1>Teach Easy</h1>
            </div>
        </div>
    )
}

export default Navbar;