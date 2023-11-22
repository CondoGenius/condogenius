import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../../components/utils/errorField';
import useUser from '../../../../states/user/hooks/useUser';

import './reset_password.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
    .required(requiredFieldMessage)
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    passwordVerify: Yup.string()
        .required(requiredFieldMessage)
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .test('passwords-match', 'As senhas não coincidem', function (value) {
        return value === this.parent.password;
        }),
});
  

const onSubmit = async (values, resetPassword, history) => {
    const response = await resetPassword(values.password);

    if (response?.status === 200) {
        history.push('/login');
        localStorage.removeItem("user");
        localStorage.removeItem("resident");
    
        history.push('/');

        toast.success("Senha alterada com sucesso. Realize login novamente");
    } else {
        toast.error("Ocorreu um erro ao atualizar sua senha. Tente novamente mais tarde ou entre em contato com um administrador.")
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
        id="passwordVerify"
        type="password" 
        placeholder="Confirme sua senha" 
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.passwordVerify} 
    />
);

const renderButtonSubmit = (isValid, handleSubmit, setIsSubmit) => (
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
        Redefinir senha
    </Button>
);

const ResetPassword = () => {
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const { resetPassword } = useUser();
    
    return (
        <div className='background_content'>
            <Formik        
                initialValues={{
                    password: '',
                    passwordVerify: ''
                }}
                validationSchema={FormResetPasswordSchema}
                onSubmit={values => {onSubmit(values, resetPassword, history)}}
            > 
                {({
                    handleChange,
                    handleBlur,
                    values,
                    handleSubmit,
                    isValid,
                    errors
                }) => (
                    <div className='card_content_reset_password'>
                        <h1>Redefinir senha</h1>
                        <p>Escolha sua nova senha</p>
                        <div className='fields_content'>
                            <div>
                                {renderFieldPassword(handleChange, handleBlur, values)}
                                {isSubmit && errors.password && <ErrorField error={errors.password}/>}
                            </div>

                            <div>
                                {renderFieldVerifyPassword(handleChange, handleBlur, values)}
                                {isSubmit && errors.passwordVerify && <ErrorField error={errors.passwordVerify}/>}
                            </div>
                            
                            <div className='actions'>
                                {renderButtonSubmit(isValid, handleSubmit, setIsSubmit)}
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
};

export default ResetPassword;