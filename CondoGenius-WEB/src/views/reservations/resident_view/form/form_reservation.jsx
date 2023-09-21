import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ErrorField from '../../../../components/utils/errorField';
import { Button } from 'react-materialize';


import './form_reservation.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormReservationSchema = Yup.object().shape({
    type: Yup.string().ensure().required(requiredFieldMessage),
    date: Yup.string().ensure().required(requiredFieldMessage),
});

const onSubmit = async (values, area) => {
    
};

const renderFieldTypeEvent = (handleChange, handleBlur, values) => (
    <select 
        class="browser-default"
        name="type"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.type}
    >
        <option value="" disabled selected hidden>Selecione o tipo de evento</option>
        <option value="birth">Aniversário</option>
        <option value="family_event">Evento familiar</option>
        <option value="other">Outro</option>
    </select>
);

const renderFieldDate = (handleChange, handleBlur, values) => (
    <input 
        id="date"
        type="date" 
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.date} 
    />
);

const renderButtonSubmit = (isValid, handleSubmit, handleReset, setIsSubmit) => (
    <Button 
        type="submit"
        onClick={() => {
            setIsSubmit(true);
            if (isValid) {
                handleSubmit();
            }
        }}
    >
        Reservar
    </Button>
);

const FormReservations = (area) => {
    const [isSubmit, setIsSubmit] = useState(false);

    return (
        <Formik        
            initialValues={{
                type: '',
                date: '',
            }}
            validationSchema={FormReservationSchema}
            onSubmit={values => {onSubmit(values, area)}}
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
            <div className='form_content'>
                <div className='fields'>
                    <div class="row">
                        <form class="col s12">
                            <div class="input-field col s6">
                                {renderFieldTypeEvent(handleChange, handleBlur, values)}
                                {isSubmit && errors.type && <ErrorField error={errors.type}/>}
                            </div>
                            <div class="input-field col s6">
                                {renderFieldDate(handleChange, handleBlur, values)}
                                {isSubmit && errors.date && <ErrorField error={errors.date}/>}
                            </div>
                        </form>
                    </div>
                    
                    <div className='actions'>
                        {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit)}
                    </div>
                </div>
            </div>
        )}
        </Formik>
    );

}

export default FormReservations;