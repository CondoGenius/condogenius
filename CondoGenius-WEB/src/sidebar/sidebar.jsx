import React from 'react';
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
        <li><MdOutlineHub /> Hub Digital</li>
        <li><MdPeopleAlt /> Moradores</li>
        <li><GiBarbecue /> Reservas</li>
        <li><SiGooglemeet /> Reuniões</li>
        <li><TiWarning /> Reclamações</li>
        <li><BsCheck2Square /> Check-in</li>
        <li><BsBoxSeamFill /> Entregas</li>
      </ul>
    </div>
  );
}

export default Sidebar;