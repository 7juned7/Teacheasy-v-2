import React, { useState } from 'react'
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [flag, setFlag] = useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, setFlag, flag }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider