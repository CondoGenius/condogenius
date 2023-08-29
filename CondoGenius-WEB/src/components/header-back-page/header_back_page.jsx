import React from "react";
import { NavLink } from 'react-router-dom';

import './header_back_page.scss';

import { MdArrowBack } from 'react-icons/md'

const HeaderBackPage = () => {
    return (
        <div className="header_back_page_content">
            <NavLink to="/residents">
                <span><MdArrowBack /> Voltar</span>
            </NavLink>
        </div>
    )
};

export default HeaderBackPage;