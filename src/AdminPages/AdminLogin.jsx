import React, { useState, useContext } from "react";
import { Container, Button, Form as BootstrapForm } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "animate.css";

export default function LoginForm() {
  // const formData = useActionData()
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorPrompt, setErrorPrompt] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform action request here

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdminLoggedin", true);
      return navigate("/admin");
    } else {
      setErrorPrompt("You have entered wrong account.");
    }
  };

  return (
    <Container
      fluid
      className="bg-secondary border d-flex justify-content-center align-items-center vh-100"
    >
      <div className="border bg-light rounded p-5 animate__animated animate__backInDown">
        <h1 className="text-center text-primary fw-bold">Dental Admin Login</h1>
        {errorPrompt && <p className="text-danger">{errorPrompt}</p>}
        <form
          style={{ width: "300px" }}
          className="my-4 mx-auto"
          onSubmit={handleFormSubmit}
        >
          <BootstrapForm.Group
            controlId="formBasicusername"
            className="d-flex justify-content-center flex-column align-items-center"
          >
            <BootstrapForm.Label>Username:</BootstrapForm.Label>
            <BootstrapForm.Control
              name="username"
              className="rounded-pill"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group
            controlId="formBasicPassword"
            className="d-flex justify-content-center flex-column align-items-center"
          >
            <BootstrapForm.Label>Password:</BootstrapForm.Label>
            <BootstrapForm.Control
              name="password"
              className="rounded-pill"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </BootstrapForm.Group>

          <div className="d-flex justify-content-center align-items-center mt-3">
            <Link to=".." relative="path" className="mt-2 me-3">
              <Button variant="danger">Back</Button>
            </Link>
            <Button
              variant="primary"
              type="submit"
              className="mt-2 mb-0 fw-bold"
            >
              Login
            </Button>
          </div>
        </form>
        <div className="d-flex justify-content-between pt-3">
          <p>
            username: <span className="fw-bold">admin</span>
          </p>
          <p>
            password: <span className="fw-bold">admin</span>
          </p>
        </div>
      </div>
    </Container>
  );
}
