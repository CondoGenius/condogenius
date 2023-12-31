import React from 'react';
import { useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';

import logo from '../../assets/condogenius.png';

import { AiOutlineContacts } from 'react-icons/ai';
import { BsBoxSeamFill, BsPersonCircle } from 'react-icons/bs';
import { GiBarbecue, GiNotebook } from 'react-icons/gi';
import { MdExitToApp, MdOutlineHub, MdPeopleAlt } from 'react-icons/md';
import { TiWarning } from 'react-icons/ti';

import Tooltip from '../tooltip/tooltip';
import './navbar.scss';

const navLink = (route, icon, name) => {
    const Icon = icon 
    return (
        <NavLink to={route} activeClassName='selected'>
            <Icon /> {name}
        </NavLink>
    );
};

const logout = (history) => {
    localStorage.removeItem("user");
    localStorage.removeItem("resident");

    history.push('/');
    window.location.reload();
};

const Navbar = () => {
    const history = useHistory();
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

                    {!user.isAdmin && navLink('/meetings-list', GiNotebook, 'Reuniões')}
                    {user.isAdmin && navLink('/meetings', GiNotebook, 'Reuniões')}

                    {user.isAdmin && navLink('/complaints-list', TiWarning, 'Reclamações')}
                    {!user.isAdmin && navLink('/complaints', TiWarning, 'Reclamações')}

                    {!user.isAdmin && navLink('/deliveries-list', BsBoxSeamFill, 'Entregas')}
                    {user.isAdmin && navLink('/deliveries', BsBoxSeamFill, 'Entregas')}

                    {!user.isAdmin && navLink('/quick-contacts-list', AiOutlineContacts, 'Lista rápida')}
                    {user.isAdmin && navLink('/quick-contacts', AiOutlineContacts, 'Lista rápida')}

                </ul>
            </div>
            <div className="actions_content">
                {!user.isAdmin && navLink('/profile', BsPersonCircle, 'Perfil')}
                <Tooltip message={"Sair"}>
                    <span className='exit_icon' onClick={() => logout(history)}><MdExitToApp className='logout_icon'/></span>
                </Tooltip>
            </div>
        </div>
    );
};


export default Navbar;