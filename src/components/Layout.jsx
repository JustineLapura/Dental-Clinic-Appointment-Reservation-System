import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import Footer from "./Footer";
import { Outlet, NavLink, Link } from "react-router-dom";

function Layout() {
  const [darkMode, setDarkMode] = React.useState(false);
  const isLoggedin = localStorage.getItem("isLoggedin");

  const activeStyle = {
    fontWeight: "bold",
  };
  return (
    <div className="d-flex flex-column justify-content-between h-100 pb-3 pt-1">
      <Navbar className="border-bottom shadow-sm" expand="lg">
        <Container>
          <Link to="/" className="fw-bold text-primary nav-link fs-4 me-5">
            Smile Care Dental Clinic
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={darkMode ? "text-light" : null}>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/"
                className={`nav-link ${darkMode ? "text-light" : null}`}
              >
                Home
              </NavLink>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/appointments"
                className={`nav-link ${darkMode ? "text-light" : null}`}
              >
                Appointments
              </NavLink>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/services"
                className={`nav-link ${darkMode ? "text-light" : null}`}
              >
                Services
              </NavLink>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/about"
                className={`nav-link ${darkMode ? "text-light" : null}`}
              >
                About Us
              </NavLink>
              <Link to="admin-login">
            <Button variant="dark" className="btn-sm fw-bold d-lg-none">
              Log in as Admin
            </Button>
          </Link>
            </Nav>
          </Navbar.Collapse>
          <Link style={{ textDecoration: 'none' }} to="admin-login">
            <Button variant="dark" className="btn-sm fw-bold d-none d-lg-flex">
              Log in as Admin
            </Button>
          </Link>
        </Container>
      </Navbar>
      <Outlet context={darkMode} />
      <div className="mb-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
