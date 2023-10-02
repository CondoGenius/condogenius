import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from 'react-materialize';
import ErrorField from '../../../../components/utils/errorField';

import useLogin from '../../../../states/login/hooks/useLogin';

import './register.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormLoginSchema = Yup.object().shape({
    email: Yup.string().ensure().required(requiredFieldMessage),
    password: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values, authUserLogin, setMessageSubmitLogin, history) => {
    history.push('/');
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
        Salvar
    </Button>
);

const Register = () => {
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const { authUserLogin } = useLogin();
    const [messageSubmitLogin, setMessageSubmitLogin] = useState(null);
    
    return (
        <div className='background_content'>
            <Formik        
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={FormLoginSchema}
                onSubmit={values => {onSubmit(values, authUserLogin, setMessageSubmitLogin, history)}}
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
                    <div className='card_content_register'>  
                        <div className='fields_content'>
                        <h1>Seja bem vindo, José!</h1>
                        <p>Escolha sua senha</p>
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
                            </div>
                        </div>
                        {messageSubmitLogin && <ErrorField error={messageSubmitLogin}/>}
                    </div>
                )}
            </Formik>
        </div>
    )
};

export default Register;
