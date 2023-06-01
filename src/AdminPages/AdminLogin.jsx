import React, { useState, useContext } from 'react';
import { Container, Button, Form as BootstrapForm } from 'react-bootstrap';
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import 'animate.css';

export default function LoginForm() {
    // const formData = useActionData()
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorPrompt, setErrorPrompt] = useState("")

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Perform action request here

        if (username === "admin" && password === "admin") {
            localStorage.setItem("isAdminLoggedin", true);
            return navigate("/admin");
        } else {
            setErrorPrompt("You have entered wrong account.")
        }
    };

    return (
        <Container fluid className="bg-secondary border d-flex justify-content-center align-items-center vh-100">
            <div className='border bg-light rounded p-5'>
                <h1 className="text-center text-primary fw-bold">Dental Admin Login</h1>
                {errorPrompt && <p className='text-danger'>{errorPrompt}</p>}
                <form style={{ width: "300px" }} className="my-4 mx-auto" onSubmit={handleFormSubmit}>
                    <BootstrapForm.Group
                        controlId="formBasicusername"
                        className='d-flex justify-content-center flex-column align-items-center'>
                        <BootstrapForm.Label>Username:</BootstrapForm.Label>
                        <BootstrapForm.Control
                            name='username'
                            className='rounded-pill'
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group
                        controlId="formBasicPassword"
                        className='d-flex justify-content-center flex-column align-items-center'>
                        <BootstrapForm.Label>Password:</BootstrapForm.Label>
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
            </div>
        </Container>
    );
};
