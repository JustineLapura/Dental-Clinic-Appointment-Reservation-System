import React, { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const storedUsers = localStorage.getItem("users");
        return storedUsers ? JSON.parse(storedUsers) : [];
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

            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("phone", phone);
            localStorage.setItem("address", address);
            localStorage.setItem("gender", gender);

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
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export default UsersContext;
