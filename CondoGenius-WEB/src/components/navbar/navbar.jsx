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

const navLink = (route, icon, name) => {
    const Icon = icon 
    return (
        <NavLink to={route} activeClassName='selected'>
            <Icon /> {name}
        </NavLink>
    );
};

const logout = () => {
    localStorage.removeItem("user");
    window.location.reload()
}

const Navbar = () => (
    <div className="navbar_content">
        <div className="logo_content">
            <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="menu_content">
            <ul>
                {navLink('/hub', MdOutlineHub, 'Hub Digital')}
                {navLink('/residents', MdPeopleAlt, 'Moradores')}
                {navLink('/reservations', GiBarbecue, 'Reservas')}
                {navLink('/meetings', SiGooglemeet, 'Reuniões')}
                {navLink('/complaints', TiWarning, 'Reclamações')}
                {navLink('/check-in', BsCheck2Square, 'Check-in')}
                {navLink('/deliverys', BsBoxSeamFill, 'Entregas')}
            </ul>
        </div>
        <div className="actions_content">
            {navLink('/profile', BsPersonCircle, 'Perfil')}
            <span className='exit_icon' onClick={logout}><MdExitToApp className='logout_icon'/></span>
        </div>
    </div>
)

export default Navbar;