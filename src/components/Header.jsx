import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import logo from ".././images/logo.gif"

function Header() {
  const [darkMode, setDarkMode] = React.useState(false)

  const activeStyle = {
    fontWeight: "bold"
  }
  return (
    <>
      <Navbar className="fixed-top" bg={white} expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={darkMode ? "text-light" : null}>
              <NavLink
                style={({ isActive }) => isActive ? activeStyle : null}
                to="/"
                className={`nav-link ${darkMode ? "text-light" : null}`}>Home</NavLink>
              <NavLink
                style={({ isActive }) => isActive ? activeStyle : null}
                to="/appointments"
                className={`nav-link ${darkMode ? "text-light" : null}`}
              >Appointments</NavLink>
              <NavLink
                style={({ isActive }) => isActive ? activeStyle : null}
                to="/services"
                className={`nav-link ${darkMode ? "text-light" : null}`}
              >Services</NavLink>
              <NavLink
                style={({ isActive }) => isActive ? activeStyle : null}
                to="/about"
                className={`nav-link ${darkMode ? "text-light" : null}`}
              >About Us</NavLink>
              <NavLink
                style={({ isActive }) => isActive ? activeStyle : null}
                to="/payment"
                className={`nav-link ${darkMode ? "text-light" : null}`}
              >Payment</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Button className='btn-danger'>Logout</Button>
      </Navbar>

    </>
  );
}

export default Header;