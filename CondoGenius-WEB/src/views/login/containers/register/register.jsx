import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button } from 'react-materialize';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../../components/utils/errorField';
import useUser from '../../../../states/user/hooks/useUser';

import './register.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormLoginSchema = Yup.object().shape({
    password: Yup.string()
        .required(requiredFieldMessage)
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .test('passwords-match', 'As senhas não coincidem', function (value) {
        return value === this.parent.password_verify;
    }),
    password_verify: Yup.string()
        .required(requiredFieldMessage)
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .test('passwords-match', 'As senhas não coincidem', function (value) {
        return value === this.parent.password;
        }),
});
  

const onSubmit = async (values, resident, createUser, setMessageSubmitLogin, history) => {
    const response = await createUser(resident.data.email, values.password);

    if (response?.status === 201) {
        toast.success("Usuário cadastrado no banco de dados! Realize seu primeiro login.")
        history.push('/');
    } else {
        toast.error("Ocorreu um erro no cadastro do usuário. Tente novamente mais tarde ou entre em contato com um administrador.")
    }
}


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
    
const renderFieldVerifyPassword = (handleChange, handleBlur, values) => (
    <input 
        id="password_verify"
        type="password" 
        placeholder="Confirme sua senha" 
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password_verify} 
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
    const resident = useSelector((state) => state.resident);
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const { createUser } = useUser();
    const [messageSubmitLogin, setMessageSubmitLogin] = useState(null);
    
    return (
        <div className='background_content'>
            <Formik        
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={FormLoginSchema}
                onSubmit={values => {onSubmit(values, resident, createUser, setMessageSubmitLogin, history)}}
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
                        <h1>Seja bem vindo, {resident.data?.name}!</h1>
                        <p>Escolha sua senha</p>
                            <div>
                                {renderFieldPassword(handleChange, handleBlur, values)}
                                {isSubmit && errors.password && <ErrorField error={errors.password}/>}
                            </div>

                            <div>
                                {renderFieldVerifyPassword(handleChange, handleBlur, values)}
                                {isSubmit && errors.password_verify && <ErrorField error={errors.password_verify}/>}
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
