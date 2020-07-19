import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './Sidebar.css';
import { FaUserEdit } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';
import { FaUserAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidenav">
      <h4 className="adminheader">Admin</h4>
      <Nav vertical>

        <NavItem>
            <NavLink className="link" a href="/adminportal/CreateUser"><FaUserEdit/> Add User</NavLink>
        </NavItem>

        <NavItem>
            <NavLink className="link" a href="/adminportal/CreateDealership"><FaLocationArrow/> Add Dealership</NavLink>
        </NavItem>

        <NavItem>
            <NavLink className="link" a href="/adminportal/AddVehicle"><FaCar/> Add Vehicle</NavLink>
        </NavItem>

        <NavItem>
            <NavLink className="link" a href="/adminportal/Inventory"><FaCar/> Manage Inventory</NavLink>
        </NavItem>

      </Nav>
    </div>
  );
}

export default Sidebar;
