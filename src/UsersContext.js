import React, {createContext, useState} from "react";

export const UsersContext = createContext()

export const UsersProvider = ({children}) => {
const [users, addUsers] = useState([])

    return(
        <UsersContext.Provider value={{users, addUsers}}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContext