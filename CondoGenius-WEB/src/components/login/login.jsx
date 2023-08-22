import React from 'react';
import { Button } from 'react-materialize';
import logo from '../../assets/condogenius.png';
import { useHistory } from 'react-router-dom';

import './login.scss';

const Login = () => {
    const history = useHistory();

    const navigateToHome = () => {
        history.push('/home');
    };

    return (
        <div className='login_content'>
            <div className='card_content'>
                <img src={logo} className='logo' alt='logo condogenius' />
                <input type="text" placeholder="Digite seu e-mail" />
                <input type="password" placeholder="Digite sua senha" />
                <div className='actions'>
                    <Button className='button_to_enter' onClick={navigateToHome}>Entrar</Button>
                    <a href=''>Cadastre-se</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
