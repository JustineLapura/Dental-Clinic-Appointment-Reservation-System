import React from 'react'
import { Container, Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Outlet } from "react-router-dom" 

function DentalRecordsLayout() {
    const activeStyle = {
        fontWeight: "bold"
      }

  return (
    <div>
      <Navbar bg={"light"} >
        <Container>
            <Nav className="ml-auto">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} className="nav-link" to="." end>Appointment Management</NavLink>
            </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default DentalRecordsLayout
