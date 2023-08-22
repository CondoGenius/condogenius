import React from 'react';
import logo from '../../assets/condogenius.png';
import { MdExitToApp } from 'react-icons/md';
import { BsPersonCircle } from 'react-icons/bs';

import './navbar.scss';


const Navbar = () => {
  return (
    <div className="navbar_content">
      <img src={logo} alt="Logo" className="logo" />
      <div className="menu">
        <a href="#">Perfil<BsPersonCircle /></a>
        <MdExitToApp className='logout_icon'/>
      </div>
    </div>
  );
};

export default Navbar;