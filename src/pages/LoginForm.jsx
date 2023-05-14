import React from 'react';
import { Container, Button, Form as BootstrapForm } from 'react-bootstrap';
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";

export async function action({ request }) {
    const emailValidate = localStorage.getItem("email")
    const passwordValidate = localStorage.getItem("password")
    const formData = await request.formData();
    const email = formData.get("email")
    const password = formData.get("password")
    
    if(email === emailValidate && password === passwordValidate){
        localStorage.setItem("isLoggedin", true)
        return redirect("/appointments")
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
            <Form method="post" replace className="my-4">
                <BootstrapForm.Group 
                    controlId="formBasicEmail" 
                    className='d-flex justify-content-center flex-column align-items-center'>
                    <BootstrapForm.Label>Email address</BootstrapForm.Label>
                    <BootstrapForm.Control name='email' className='rounded-pill w-50' type="email" placeholder="Enter email" />
                </BootstrapForm.Group>

                <BootstrapForm.Group 
                    controlId="formBasicPassword" 
                    className='d-flex justify-content-center flex-column align-items-center'>
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <BootstrapForm.Control name='password' className='rounded-pill w-50' type="password" placeholder="Password"  />
                </BootstrapForm.Group>

                <Button variant="primary" type="submit" className="mt-2 mb-0 fw-bold">
                    Login
                </Button>
            </Form>
            <Button variant="success" type="submit" className="mt-0 fw-bold" onClick={() => navigate("/registration")}>
                Create new account
            </Button>
        </Container>
    );
};
