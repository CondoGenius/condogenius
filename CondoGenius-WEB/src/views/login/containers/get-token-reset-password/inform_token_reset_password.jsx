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
const FormInformTokenResetPassword = Yup.object().shape({
    token: Yup.string().ensure().required(requiredFieldMessage)
});
  

const onSubmit = async (values, verifyTokenResetPassword, history) => {
    const response = await verifyTokenResetPassword(values.token);

    if (response?.status === 200) {
        history.push('/reset-password');
    } else {
        toast.error("Ocorreu um erro na validação do token. Tente novamente mais tarde ou entre em contato com um administrador.");
    }
}

const renderFieldToken = (handleChange, handleBlur, values) => (
    <input 
        id="token "
        type="text" 
        placeholder="Informe o token"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.token } 
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
        Validar token
    </Button>
);

const InformTokenResetPassword = () => {
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const { verifyTokenResetPassword } = useUser();
    
    return (
        <div className='background_content'>
            <Formik        
                initialValues={{
                    token: ''
                }}
                validationSchema={FormInformTokenResetPassword}
                onSubmit={values => {onSubmit(values, verifyTokenResetPassword, history)}}
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
                        <p>Informe o token enviado no seu e-mail</p>
                        <div className='fields_content'>
                            <div>
                                {renderFieldToken(handleChange, handleBlur, values)}
                                {isSubmit && errors.token && <ErrorField error={errors.token}/>}
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

export default InformTokenResetPassword;