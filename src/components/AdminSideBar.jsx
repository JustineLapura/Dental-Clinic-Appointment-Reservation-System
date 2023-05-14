import React from "react";
import { Nav } from "react-bootstrap";
import { BsHouseDoor, BsClock, BsCalendar, BsFillPeopleFill, BsFillPersonFill, BsPencilSquare } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom"

const Sidebar = () => {

  const activeStyle = {
    fontWeight: "bold"
  }

  return (
    <div className="p-2">
      <Nav className="flex-column align-items-lg-start align-items-md-center">
        <ul className="list-group">
          <li className="list-group-item">
            <NavLink style={({ isActive }) => isActive ? activeStyle : null} end to="/admin" className="nav-link">
              <BsHouseDoor size={20} /> Home <FiChevronRight size={16} className="float-right" />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="schedule-today" className="nav-link">
              <BsClock size={20} /> Schedule for today <FiChevronRight size={16} className="float-right" />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="schedule" className="nav-link">
              <BsCalendar size={20} /> Schedule <FiChevronRight size={16} className="float-right" />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="service" className="nav-link">
              <BsFillPeopleFill size={20} /> Service <FiChevronRight size={16} className="float-right" />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="user-accounts" className="nav-link">
              <BsFillPersonFill size={20} /> User Accounts <FiChevronRight size={16} className="float-right" />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="members" className="nav-link">
              <BsFillPersonFill size={20} /> Members <FiChevronRight size={16} className="float-right" />
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="note" className="nav-link">
              <BsPencilSquare size={20} /> Note <FiChevronRight size={16} className="float-right" />
            </NavLink>
          </li>
        </ul>
      </Nav>
    </div>

  );
};

export default Sidebar;
