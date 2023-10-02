import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from 'react-materialize';
import ErrorField from '../../../../components/utils/errorField';
import logo from '../../../../assets/condogenius.png';

import useLogin from '../../../../states/login/hooks/useLogin';

import './register_verifys.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormLoginSchema = Yup.object().shape({
    document: Yup.string().ensure().required(requiredFieldMessage),
});

const onSubmit = async (values, authUserLogin, setMessageSubmitLogin, history) => {
    history.push('/register');
}

const renderFieldDocument = (handleChange, handleBlur, values) => (
    <input 
        id="document"
        type="text" 
        placeholder="Digite o número de seu documento"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.document} 
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
        Continuar
    </Button>
);

const RegisterVerifys = () => {
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const { authUserLogin } = useLogin();
    const [messageSubmitLogin, setMessageSubmitLogin] = useState(null);
    
    return (
        <div className='background_content'>
            <Formik        
                initialValues={{
                    document: ''
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
                    <div className='card_content_register_verifys'> 
                        <div className='logo'>
                            <img src={logo} alt='logo condogenius' />
                        </div>
                      

                        <div className='fields_content_verifys_register'>
                            <h1>Cadastre-se</h1>
                            <div>
                                {renderFieldDocument(handleChange, handleBlur, values)}
                                {isSubmit && errors.document && <ErrorField error={errors.document}/>}
                            </div>

                            <div className='actions'>
                                {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit)}
                            </div>
                            {messageSubmitLogin && <ErrorField error={messageSubmitLogin}/>}
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
};

export default RegisterVerifys;
