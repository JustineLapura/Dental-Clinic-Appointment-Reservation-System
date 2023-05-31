import React, { useState, useContext } from 'react';
import { Container, Button, Form as BootstrapForm } from 'react-bootstrap';
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import UsersContext from '../UsersContext';
import 'animate.css';

export default function LoginForm() {
    // const formData = useActionData()
    const navigate = useNavigate();
    const { users, setSelectedUser } = useContext(UsersContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Perform action request here

        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem("isLoggedin", true);
            setSelectedUser(user)
            return navigate("/appointments");
        } else {
            setErrorMessage("You have entered wrong account.")
        }
    };

    return (
        <Container className="my-5">
            <h1 className="text-center">Dental Login</h1>
            <h6 className='text-danger'>You must log in.</h6>
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
            <form style={{ width: "300px" }} className="my-4 mx-auto" onSubmit={handleFormSubmit}>
                <BootstrapForm.Group
                    controlId="formBasicEmail"
                    className='d-flex justify-content-center flex-column align-items-center'>
                    <BootstrapForm.Label>Email address</BootstrapForm.Label>
                    <BootstrapForm.Control
                        name='email'
                        className='rounded-pill'
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </BootstrapForm.Group>

                <BootstrapForm.Group
                    controlId="formBasicPassword"
                    className='d-flex justify-content-center flex-column align-items-center'>
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <BootstrapForm.Control
                        name='password'
                        className='rounded-pill'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </BootstrapForm.Group>

                <Button variant="primary" type="submit" className="mt-2 mb-0 fw-bold">
                    Login
                </Button>
            </form>
            <Button variant="success" type="submit" className="mt-0 fw-bold animate__animated animate__headShake animate__delay-2s animate__infinite animate__slower" onClick={() => navigate("/registration")}>
                Create new account
            </Button>
        </Container>
    );
};
