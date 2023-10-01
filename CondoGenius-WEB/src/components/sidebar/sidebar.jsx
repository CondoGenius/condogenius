import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.scss'; 

import { MdOutlineHub } from 'react-icons/md'
import { MdPeopleAlt } from 'react-icons/md';
import { GiBarbecue } from 'react-icons/gi';
import { SiGooglemeet } from 'react-icons/si';
import { TiWarning } from 'react-icons/ti';
import { BsCheck2Square } from 'react-icons/bs';
import { BsBoxSeamFill } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <NavLink to="/home"><li><MdOutlineHub /> Hub Digital</li></NavLink>
        <NavLink to="/residents"><li><MdPeopleAlt /> Moradores</li></NavLink>
        <NavLink to="/reservations"><li><GiBarbecue /> Reservas</li></NavLink>
        <li><SiGooglemeet /> Reuniões</li>
        <NavLink to="/complaints"><li><TiWarning /> Reclamações</li></NavLink>
        <li><BsCheck2Square /> Check-in</li>
        <li><BsBoxSeamFill /> Entregas</li>
      </ul>
    </div>
  );
}

export default Sidebar;