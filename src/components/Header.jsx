import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

function Header() {
  const [darkMode, setDarkMode] = React.useState(false)

  const activeStyle = {
    fontWeight: "bold"
  }
  return (
    <>
      <Navbar className={`fixed-top ${darkMode ? "text-light" : null }`} bg={darkMode ? "dark" : "white"} expand="lg">
        <Container>
         <Navbar.Brand>
            <img
              className="rounded"
              width={150}
              src="https://media.giphy.com/media/crLRG6Y7KMcFwPvkn5/giphy.gif"
              alt="Dental Clinic Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={darkMode ? "text-light" : null }>
              <NavLink 
                style={({ isActive }) => isActive ? activeStyle : null} 
                to="/" 
                className={`nav-link ${darkMode ? "text-light" : null }`}>Home</NavLink>
              <NavLink 
                style={({ isActive }) => isActive ? activeStyle : null} 
                to="/appointments" 
                className={`nav-link ${darkMode ? "text-light" : null }`}
              >Appointments</NavLink>
              <NavLink 
                style={({ isActive }) => isActive ? activeStyle : null} 
                to="/services" 
                className={`nav-link ${darkMode ? "text-light" : null }`}
              >Services</NavLink>
              <NavLink 
                style={({ isActive }) => isActive ? activeStyle : null} 
                to="/about" 
                className={`nav-link ${darkMode ? "text-light" : null }`}
              >About Us</NavLink>
              <NavLink 
                style={({ isActive }) => isActive ? activeStyle : null} 
                to="/payment" 
                className={`nav-link ${darkMode ? "text-light" : null }`}
              >Payment</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div class="form-check form-switch me-3 w-50 d-flex justify-content-center border">
            <label className="form-check-label fw-bold" HTMLfor="flexSwitchCheckDefault">{darkMode ? "DarkMode" : "LightMode"}</label>
            {darkMode ? <RiMoonClearFill /> : <RiSunFill /> }
            <input
              className="form-check-input ms-2"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onClick={() => setDarkMode(prevMode => !prevMode)}
              checked={darkMode}
            />
        </div>
        <Button className='btn-danger'>Logout</Button>
      </Navbar>

    </>
  );
}

export default Header;
