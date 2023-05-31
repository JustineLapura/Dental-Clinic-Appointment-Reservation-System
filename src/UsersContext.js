import React, { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const storedUsers = localStorage.getItem("users");
        return storedUsers ? JSON.parse(storedUsers) : [];
    });

    const [selectedUser, setSelectedUser] = useState(() => {
        const storedSelectedUser = localStorage.getItem("selectedUser");
        return storedSelectedUser ? JSON.parse(storedSelectedUser) : null;
    });

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);


    useEffect(() => {
        localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    }, [selectedUser]);

    const navigateToAppointments = () => {
        // Implement your custom navigation logic here
        // For example:
        window.location.href = "/appointments";
    };

    const isEmailDuplicate = (email) => {
        return users.some((user) => user.email === email);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (isEmailDuplicate(email)) {
            setErrorMessage("Email already exists. Please choose a different email.");
            return;
        }

        if (
            firstName &&
            lastName &&
            phone &&
            address &&
            gender &&
            email &&
            password &&
            passwordConfirm &&
            password === passwordConfirm
        ) {
            const newUser = {
                id: nanoid(),
                firstName,
                lastName,
                phone,
                address,
                gender,
                email,
                password,
            };

            setUsers([...users, newUser]);
            navigateToAppointments();

            setErrorMessage("");
        } else if (
            !firstName ||
            !lastName ||
            !phone ||
            !address ||
            !gender ||
            !email ||
            !password ||
            !passwordConfirm
        ) {
            setErrorMessage("Please complete the form!");
        } else {
            setErrorMessage("Passwords do not match. Please try again.");
        }
    };

    return (
        <UsersContext.Provider
            value={{
                users,
                setUsers,
                firstName,
                setFirstName,
                lastName,
                setLastName,
                phone,
                setPhone,
                address,
                setAddress,
                gender,
                setGender,
                email,
                setEmail,
                password,
                setPassword,
                passwordConfirm,
                setPasswordConfirm,
                errorMessage,
                setErrorMessage,
                handleFormSubmit,
                selectedUser,
                setSelectedUser
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export default UsersContext;
