import { Formik } from 'formik';
import React, { useState } from "react";
import { Button } from "react-materialize";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../../../components/utils/errorField';
import useMeetings from '../../../../../states/meetings/hooks/useMeetings';

import './meeting_form.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormResidentSchema = Yup.object().shape({
    title: Yup.string().ensure().required(requiredFieldMessage),
    description: Yup.string().ensure().required(requiredFieldMessage),
    date: Yup.string().ensure().required(requiredFieldMessage),
    hour: Yup.string().ensure().required(requiredFieldMessage),
    duration: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values, createMeeting, getMeetings) => {
    const response = await createMeeting(values);

    if (response.status === 201) {
        document.getElementById('reset_form_meetings').click();
        toast.success("Reunião cadastrada com sucesso")
        getMeetings();
    }
};

const renderFieldTitle = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="title"
            type="text"
            onChange={handleChange}
            value={values.title}
            handleBlur={handleBlur}
        />
        <label for="title" class="active">Tema da reunião</label>
    </div>
);

const renderFieldDescription = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <textarea 
            id="description"
            type="text"
            onChange={handleChange}
            value={values.description}
            handleBlur={handleBlur}
        />
        <label for="description" class="active">Descrição</label>
    </div>
);

const renderFieldDate = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="date"
            type="date" 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date} 
        />
        <label for="description" class="active">Data</label>
    </div>
);

const renderFieldHour = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="hour"
            type="time" 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.hour} 
        />
        <label for="hour" class="active">Hora</label>
    </div>
);

const renderFieldDuration = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="duration"
            type="time" 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.duration} 
        />
        <label for="duration" class="active">Duração</label>
    </div>
);

const renderButtonSubmit = (isValid, handleSubmit, handleReset, setIsSubmit) => (
    <div className='button_content'>
        <Button 
            modal={isValid ? "close" : "open"}
            node="button"
            type="submit"
            onClick={() => {
                setIsSubmit(true);
                if (isValid) {
                    handleSubmit();
                }
            }}
        >
            Cadastrar reunião
        </Button>
        <Button
            id="reset_form_meetings"
            className="display_none"
            onClick={() => {
            handleReset();
            }}
        />
    </div>
);


const MeetingsForm = () => {
    const residences = useSelector(state => state.residences.list);
    const user = useSelector(state => state.user.data);
    
    const { createMeeting, getMeetings } = useMeetings();

    const [isSubmit, setIsSubmit] = useState(false);


    return (
        <Formik        
            initialValues={{
                userId: user.id,
                title: '',
                description: '',
                date: '',
                hour: '',
                duration: ''
            }}
            validationSchema={FormResidentSchema}
            onSubmit={values => {onSubmit(values, createMeeting, getMeetings)}}
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
            <div className="meeting_form_content">
                 <div class="row">
                    <form class="col s12">
                        {renderFieldTitle(handleChange, handleBlur, values, residences)}
                        {isSubmit && errors.title && <ErrorField error={errors.title}/>}
                    </form>
                 </div>
                 <div class="row">
                    <form class="col s12">
                        {renderFieldDescription(handleChange, handleBlur, values, residences)}
                        {isSubmit && errors.description && <ErrorField error={errors.description}/>}
                    </form>
                 </div>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s4">
                        {renderFieldDate(handleChange, handleBlur, values, residences)}
                        {isSubmit && errors.date && <ErrorField error={errors.date}/>}
                    </div>
                    <div class="input-field col s4">
                        {renderFieldHour(handleChange, handleBlur, values, residences)}
                        {isSubmit && errors.hour && <ErrorField error={errors.hour}/>}
                    </div>
                    <div class="input-field col s4">
                        {renderFieldDuration(handleChange, handleBlur, values, residences)}
                        {isSubmit && errors.duration && <ErrorField error={errors.duration}/>}
                    </div>
                  </form>
                 </div>
            
                {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit)}
            </div>
        )}
    </Formik>
    )
};

export default MeetingsForm;