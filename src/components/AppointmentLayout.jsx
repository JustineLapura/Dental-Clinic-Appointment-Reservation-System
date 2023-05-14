import React from 'react'
import { Container, Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Outlet, useOutletContext } from "react-router-dom" 

function AppointmentLayout() {
  const darkMode = useOutletContext()
    const activeStyle = {
        fontWeight: "bold"
      }
  return (
    <div>
      <Navbar bg={darkMode ? "dark" : "light"} >
        <Container>
            <Nav className="ml-auto">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="." end className={`nav-link ${darkMode ? "text-white" : null}`}>Dashboard</NavLink>
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="account" className={`nav-link ${darkMode ? "text-white" : null}`}>Account</NavLink>
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="records" className={`nav-link ${darkMode ? "text-white" : null}`}>Records</NavLink>
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="profile" className={`nav-link ${darkMode ? "text-white" : null}`}>Profile</NavLink>
            </Nav>
        </Container>
      </Navbar>
      <Outlet context={darkMode}/>
    </div>
  )
}

export default AppointmentLayout
