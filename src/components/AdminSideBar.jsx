import React from "react";
import { Nav, Container, Row } from "react-bootstrap";
import { BsHouseDoor, BsClock, BsCalendar, BsFillPeopleFill, BsFillPersonFill, BsPencilSquare } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom"

const Sidebar = () => {

  const activeStyle = {
    fontWeight: "bold",
    border: "solid 1px"
  }

  return (
        <Nav style={{ height: "550px" }} className="navbar navbar-dark bg-dark px-2 d-flex justify-content-center">
          <ul className="navbar-nav ">
            <li className="nav-item my-2">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} end to="/admin" className="nav-link">
                <BsHouseDoor size={20} /> Home
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="schedule-today" className="nav-link px-2">
                <BsCalendar size={20} /> Today's Schedule
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="schedule" className="nav-link">
                <BsCalendar size={20} /> Schedule
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="time-schedule" className="nav-link">
                <BsClock size={20} /> Time Schedule
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="service" className="nav-link">
                <BsFillPeopleFill size={20} /> Service
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="records" className="nav-link">
                <BsFillPeopleFill size={20} /> Records
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="members" className="nav-link">
                <BsFillPersonFill size={20} /> Members
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="note" className="nav-link">
                <BsPencilSquare size={20} /> Note
              </NavLink>
            </li>
          </ul>
        </Nav>
  );
};

export default Sidebar;
