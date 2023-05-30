import React from 'react';
import { Container, Button, Form as BootstrapForm } from 'react-bootstrap';
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import 'animate.css';

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email")
    const password = formData.get("password")
    
    if(email === "admin" && password === "admin"){
        return redirect("/admin")
    }
    return "You have entered wrong account.";
}

export default function LoginForm() {
    const formData = useActionData()
    const navigate = useNavigate();

    return (
        <Container className="my-5">
            <h1 className="text-center">Dental Login</h1>
            <h6 className='text-danger'>You must log in.</h6>
            {formData && <p className='text-danger'>{formData}</p>}
            <Form method="post" replace style={{width: "300px"}} className="my-4 mx-auto">
                <BootstrapForm.Group 
                    controlId="formBasicEmail" 
                    className='d-flex justify-content-center flex-column align-items-center'>
                    <BootstrapForm.Label>Username:</BootstrapForm.Label>
                    <BootstrapForm.Control name='username' className='rounded-pill' type="text" placeholder="Enter username" />
                </BootstrapForm.Group>

                <BootstrapForm.Group 
                    controlId="formBasicPassword" 
                    className='d-flex justify-content-center flex-column align-items-center'>
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <BootstrapForm.Control name='password' className='rounded-pill' type="password" placeholder="Password"  />
                </BootstrapForm.Group>

                <Button variant="primary" type="submit" className="mt-2 mb-0 fw-bold">
                    Login
                </Button>
            </Form>
        </Container>
    );
};
