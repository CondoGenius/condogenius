import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from 'react-materialize';
import ErrorField from '../../components/utils/errorField';
import logo from '../../assets/condogenius.png';

import './login.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormLoginSchema = Yup.object().shape({
    email: Yup.string().ensure().required(requiredFieldMessage),
    password: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values) => {
    localStorage.setItem("user", JSON.stringify({'email': values.email, 'password': values.password}));
    window.location.reload();
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
    
    return (
        <div className='login_content'>
            <Formik        
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={FormLoginSchema}
                onSubmit={values => {onSubmit(values)}}
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
                    <div className='card_content'>
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

                            <div className='actions'>
                                {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit)}
                                <a href='./'>Cadastre-se</a>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
};

export default Login;
