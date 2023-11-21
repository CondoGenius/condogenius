import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../../components/utils/errorField';
import useUser from '../../../../states/user/hooks/useUser';

import './get_token_reset_password.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormGetTokenSchema = Yup.object().shape({
    email: Yup.string().ensure().required(requiredFieldMessage)
});
  

const onSubmit = async (values, getTokenResetPassword, history) => {
    const response = await getTokenResetPassword(values.email);

    if (response?.status === 201) {
        history.push('/inform-token');
        toast.success("Um token de acesso foi enviado ao seu e-mail");
    } else {
        toast.error("Ocorreu um erro na validação do e-mail. Tente novamente mais tarde ou entre em contato com um administrador.");
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
        Enviar token
    </Button>
);

const GetTokenResetPassword = () => {
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const { getTokenResetPassword } = useUser();
    
    return (
        <div className='background_content'>
            <Formik        
                initialValues={{
                    token: ''
                }}
                validationSchema={FormGetTokenSchema}
                onSubmit={values => {onSubmit(values, getTokenResetPassword, history)}}
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
                    <div className='card_content_reset_password'>
                        <h1>Redefinir senha</h1>
                        <p>Informe seu e-mail para o envio do token de segurança</p>
                        <div className='fields_content'>
                            <div>
                                {renderFieldEmail(handleChange, handleBlur, values)}
                                {isSubmit && errors.email && <ErrorField error={errors.email}/>}
                            </div>
                            <div className='actions'>
                                {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit)}
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
};

export default GetTokenResetPassword;