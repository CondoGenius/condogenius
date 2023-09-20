import React from "react";
import { NavLink } from 'react-router-dom';

import './header_back_page.scss';

import { MdArrowBack } from 'react-icons/md'

const HeaderBackPage = (props) => {
    return (
        <div className="header_back_page_content">
            <NavLink to={props.route}>
                <span><MdArrowBack /> Voltar</span>
            </NavLink>
        </div>
    )
};

export default HeaderBackPage;