import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../../components/utils/errorField';
import useUser from '../../../../states/user/hooks/useUser';
import { CpfMask } from '../../../../utils/utils';

import './reset_password.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormLoginSchema = Yup.object().shape({
    document: Yup.string().ensure().required(requiredFieldMessage),
    email: Yup.string().ensure().required(requiredFieldMessage),
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
  

const onSubmit = async (values, resetPassword, history) => {
    const response = await resetPassword(values);

    if (response?.status === 200) {
        toast.success("Senha atualizada!")
        history.push('/');
    } else {
        toast.error("Ocorreu um erro na alteração. Tente novamente mais tarde ou entre em contato com um administrador.")
    }
}

const renderFieldDocument = (handleChange, handleBlur, values) => (
    <input 
        id="document"
        type="text" 
        placeholder="Digite o número de seu documento"
        onChange={(e) => {
            handleChange(e);
        }}
        onBlur={handleBlur}
        value={CpfMask(values.document)} 
        maxLength={14}
    />
);

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
        placeholder="Digite sua nova senha" 
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password} 
    />
);
    
const renderFieldVerifyPassword = (handleChange, handleBlur, values) => (
    <input 
        id="password_verify"
        type="password" 
        placeholder="Confirme sua nova senha" 
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
        Redefinir senha
    </Button>
);

const ResetPassword = () => {
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const { resetPassword } = useUser();
    const [messageSubmitLogin, setMessageSubmitLogin] = useState(null);
    
    return (
        <div className='background_content'>
            <Formik        
                initialValues={{
                    document: '',
                    email: '',
                    password: '',
                    password_verify: ''
                }}
                validationSchema={FormLoginSchema}
                onSubmit={values => {onSubmit(values, resetPassword, history)}}
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
                        <div className='fields_content'>
                            <div>
                                {renderFieldDocument(handleChange, handleBlur, values)}
                                {isSubmit && errors.document && <ErrorField error={errors.document}/>}
                            </div>
                            <div>
                                {renderFieldEmail(handleChange, handleBlur, values)}
                                {isSubmit && errors.email && <ErrorField error={errors.email}/>}
                            </div>
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

export default ResetPassword;
