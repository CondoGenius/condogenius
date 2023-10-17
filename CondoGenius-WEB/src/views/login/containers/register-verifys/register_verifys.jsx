import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-materialize';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../../../assets/condogenius.png';
import ErrorField from '../../../../components/utils/errorField';
import useResidents from '../../../../states/residents/hooks/useResidents';

import './register_verifys.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormLoginSchema = Yup.object().shape({
    document: Yup.string().ensure().required(requiredFieldMessage),
});

const onSubmit = async (values, history, getResidentByCpf) => {
    const response = await getResidentByCpf(values.document);

    if (response.status === 200) {
        history.push('/register');
    }
}

const renderFieldDocument = (handleChange, handleBlur, values, setMessageSubmitLogin) => (
    <input 
        id="document"
        type="text" 
        placeholder="Digite o número de seu documento"
        onChange={(e) => {
            handleChange(e);
            setMessageSubmitLogin("");
        }}
        onBlur={handleBlur}
        value={values.document} 
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
        Continuar
    </Button>
);

const RegisterVerifys = () => {
    const resident = useSelector((state) => state.resident);
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const [messageSubmitLogin, setMessageSubmitLogin] = useState(null);
    const { getResidentByCpf } = useResidents();

    useEffect(() => {
        if(resident?.error) {
            setMessageSubmitLogin(resident.error)
        }
    }, [resident.error]);

    return (
        <div className='background_content'>
            <Formik        
                initialValues={{
                    document: ''
                }}
                validationSchema={FormLoginSchema}
                onSubmit={(values) => {onSubmit(values, history, getResidentByCpf)}}
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
                                {renderFieldDocument(handleChange, handleBlur, values, setMessageSubmitLogin)}
                                {isSubmit && errors.document && <ErrorField error={errors.document}/>}
                            </div>
                            {messageSubmitLogin && <ErrorField error={messageSubmitLogin}/>}

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

export default RegisterVerifys;
