import React from 'react';
import logo from '../../assets/condogenius.png';
import { NavLink } from 'react-router-dom';

import { MdOutlineHub } from 'react-icons/md'
import { MdPeopleAlt } from 'react-icons/md';
import { GiBarbecue } from 'react-icons/gi';
import { SiGooglemeet } from 'react-icons/si';
import { TiWarning } from 'react-icons/ti';
import { BsCheck2Square } from 'react-icons/bs';
import { BsBoxSeamFill } from 'react-icons/bs';
import { MdExitToApp } from 'react-icons/md';
import { BsPersonCircle } from 'react-icons/bs';

import './navbar.scss';

const Navbar = () => (
    <div className="content">
        <div className="logo_content">
            <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="menu_content">
            <ul>
                <NavLink to="/home"><li><MdOutlineHub /> Hub Digital</li></NavLink>
                <NavLink to="/residents"><li><MdPeopleAlt /> Moradores</li></NavLink>
                <NavLink to="/reservations"><li><GiBarbecue /> Reservas</li></NavLink>
                <li><SiGooglemeet /> Reuniões</li>
                <NavLink to="/complaints"><li><TiWarning /> Reclamações</li></NavLink>
                <li><BsCheck2Square /> Check-in</li>
                <li><BsBoxSeamFill /> Entregas</li>
            </ul>
        </div>
        <div className="actions_content">
            <span><BsPersonCircle /><a href="#">Perfil</a></span>
            <MdExitToApp className='logout_icon'/>
        </div>
    </div>
)

export default Navbar;