import React from 'react'
import { Container, Navbar, Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom" 

function AppointmentLayout() {
  const isLoggedin = localStorage.getItem("isLoggedin")
  const navigate = useNavigate()
  const darkMode = useOutletContext()
    const activeStyle = {
        fontWeight: "bold"
      }

      function logout() {
        localStorage.removeItem("isLoggedin")
        localStorage.removeItem("phone")
        localStorage.removeItem('selectedUser')
        navigate("/login")
    }

  return (
    <div>
      <Navbar bg={"light"} className='border-bottom shadow' >
        <Container>
            <Nav className="ml-auto">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="." end className={`nav-link ${darkMode ? "text-white" : null}`}>Dashboard</NavLink>
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="account" className={`nav-link ${darkMode ? "text-white" : null}`}>Account</NavLink>
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="profile" className={`nav-link ${darkMode ? "text-white" : null}`}>Profile</NavLink>
            </Nav>
        </Container>
        {isLoggedin && <Button className="btn-danger btn-sm me-5" onClick={logout}>Logout</Button>}
      </Navbar>
      <Outlet context={darkMode}/>
    </div>
  )
}

export default AppointmentLayout
