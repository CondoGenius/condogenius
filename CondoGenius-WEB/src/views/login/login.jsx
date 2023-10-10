import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from 'react-materialize';
import ErrorField from '../../components/utils/errorField';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/condogenius.png';

import useUser from '../../states/user/hooks/useUser';

import './login.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormLoginSchema = Yup.object().shape({
    email: Yup.string().ensure().required(requiredFieldMessage),
    password: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values, authUserLogin, setMessageSubmitLogin) => {
    const response = await authUserLogin(values.email, values.password);
    if (response.status === 200) {
        window.location.reload();
    } else {
        setMessageSubmitLogin("Usuário ou senha incorretos.")
    }
}

const renderFieldEmail = (handleChange, handleBlur, values) => (
    <input 
        id="email"
        type="text" 
        placeholder="Digite seu e-mail"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email} 
    />
);

const renderFieldPassword = (handleChange, handleBlur, values) => (
    <input 
        id="password"
        type="password" 
        placeholder="Digite sua senha" 
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password} 
    />
);

const renderButtonSubmit = (isValid, handleSubmit, handleReset, setIsSubmit) => (
    <Button 
        className='button_to_enter'
        type="submit"
        onClick={() => {
            setIsSubmit(true);
            if (isValid) {
                handleSubmit();
            }
        }}
    >
        Entrar
    </Button>
);

const Login = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const { authUserLogin } = useUser();
    const [messageSubmitLogin, setMessageSubmitLogin] = useState(null);
    
    return (
        <div className='background_content'>
            <Formik        
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={FormLoginSchema}
                onSubmit={values => {onSubmit(values, authUserLogin, setMessageSubmitLogin)}}
            > 
                {({
                    handleChange,
                    handleBlur,
                    values,
                    handleSubmit,
                    handleReset,
                    isValid,
                    errors
                }) => (
                    <div className='card_content_login'>  
                        <img src={logo} className='logo' alt='logo condogenius' />

                        <div className='fields_content'>
                            <div>
                                {renderFieldEmail(handleChange, handleBlur, values)}
                                {isSubmit && errors.email && <ErrorField error={errors.email}/>}
                            </div>

                            <div>
                                {renderFieldPassword(handleChange, handleBlur, values)}
                                {isSubmit && errors.password && <ErrorField error={errors.password}/>}
                            </div>
                            {messageSubmitLogin && <ErrorField error={messageSubmitLogin}/>}

                            <div className='actions'>
                                {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit)}
                                <NavLink to="/register-verifys">
                                    <span>Cadastre-se</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
};

export default Login;
