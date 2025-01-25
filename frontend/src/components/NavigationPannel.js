import React, { useContext } from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import "./styles/NavigationPannel.css"
import SideDrawer from './SideDrawer';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
const NavigationPannel = () => {
    const { flag, setFlag } = useContext(UserContext);
    let Navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        Navigate("/")

    }
    const handleShowStudent = () => {
        setFlag(true)

    }
    return (


        <div className="navigation">
            <div className="menu">
                <ul className='menuItem'>
                    <li onClick={handleShowStudent}><PeopleAltIcon /></li>

                    <li><SideDrawer /></li>
                    <li onClick={handleLogout} ><ExitToAppIcon /></li>
                </ul>
            </div>
        </div>



    )
}

export default NavigationPannel