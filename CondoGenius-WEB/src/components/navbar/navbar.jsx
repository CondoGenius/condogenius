import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import logo from '../../assets/condogenius.png';

import { BsBoxSeamFill, BsPersonCircle } from 'react-icons/bs';
import { GiBarbecue } from 'react-icons/gi';
import { MdExitToApp, MdOutlineHub, MdPeopleAlt } from 'react-icons/md';
import { SiGooglemeet } from 'react-icons/si';
import { TiWarning } from 'react-icons/ti';

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
    localStorage.removeItem("resident");

    window.location.reload()
};

const Navbar = () => {
    const user = useSelector((state => state.user.data));

    return (
        <div className="navbar_content">
            <div className="logo_content">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="menu_content">
                <ul>
                    {navLink('/hub', MdOutlineHub, 'Hub Digital')}

                    {/* Admin routes */}
                    {user.isAdmin && navLink('/residents', MdPeopleAlt, 'Moradores')}
                    {user.isAdmin && navLink('/list-reservations', GiBarbecue, 'Reservas')}

                    {/* Resident routes */}
                    {!user.isAdmin && navLink('/reservations', GiBarbecue, 'Reservas')}

                    {navLink('/meetings', SiGooglemeet, 'Reuniões')}

                    {navLink('/complaints', TiWarning, 'Reclamações')}

                    {user.isAdmin && navLink('/deliveries-list', BsBoxSeamFill, 'Entregas')}
                    {!user.isAdmin && navLink('/deliveries', BsBoxSeamFill, 'Entregas')}

                </ul>
            </div>
            <div className="actions_content">
                {navLink('/profile', BsPersonCircle, 'Perfil')}
                <span className='exit_icon' onClick={logout}><MdExitToApp className='logout_icon'/></span>
            </div>
        </div>
    );
};


export default Navbar;