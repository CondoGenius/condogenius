import { Formik } from 'formik';
import { toast } from 'materialize-css';
import React, { useState } from 'react';
import { Button } from 'react-materialize';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import ErrorField from '../../../../components/utils/errorField';
import useReservations from '../../../../states/reservations/hooks/useReservations';

import './form_reservation.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormReservationSchema = Yup.object().shape({
    type: Yup.string().ensure().required(requiredFieldMessage),
    date: Yup.string().ensure().required(requiredFieldMessage),
});

const onSubmit = async (values, createReservation, history) => {
    const response = await createReservation(values);

    if (response?.status === 201) {
        toast.success("Reserva realizada com sucesso.");
        history.push('/my-reservations');
    }
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
        <option value="birthday">Aniversário</option>
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

const FormReservations = (areaId) => {
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    
    const resident = useSelector((state) => state.resident.data);

    const { createReservation } = useReservations();

    return (
        <Formik        
            initialValues={{
                residentId: resident.id,
                areaId: areaId,
                type: '',
                date: '',
            }}
            validationSchema={FormReservationSchema}
            onSubmit={values => {onSubmit(values, createReservation, history)}}
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