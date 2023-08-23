import React from 'react';
import { Button } from 'react-materialize';
import logo from '../../assets/condogenius.png';
import { NavLink } from 'react-router-dom';

import './login.scss';

const Login = () => {
    return (
        <div className='login_content'>
            <div className='card_content'>
                <img src={logo} className='logo' alt='logo condogenius' />
                <input type="text" placeholder="Digite seu e-mail" />
                <input type="password" placeholder="Digite sua senha" />
                <div className='actions'>
                    <NavLink to="/home">
                        <Button className='button_to_enter'>
                            Entrar
                        </Button>
                    </NavLink>
                    <a href=''>Cadastre-se</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
