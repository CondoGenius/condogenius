import { Formik } from 'formik';
import React, { useState } from "react";
import { Button } from "react-materialize";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import ErrorField from '../../../../../components/utils/errorField';
import useMeetings from '../../../../../states/meetings/hooks/useMeetings';

import './meeting_form.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormResidentSchema = Yup.object().shape({
    title: Yup.string().ensure().required(requiredFieldMessage),
    description: Yup.string().ensure().required(requiredFieldMessage),
    date: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values, createMeeting, getMeetings) => {
    const response = await createMeeting(values);

    if (response.status === 201) {
        document.getElementById('reset_form_meetings').click();
        getMeetings();
    }
};

const renderFieldTitle = (handleChange, handleBlur, values) => (
    <input 
        id="title"
        type="text"
        placeholder="Digite o tema da reunião"
        onChange={handleChange}
        value={values.title}
        handleBlur={handleBlur}
    />
);

const renderFieldDescription = (handleChange, handleBlur, values) => (
    <textarea 
        id="description"
        type="text"
        placeholder="Digite uma descrição para a reunião"
        onChange={handleChange}
        value={values.description}
        handleBlur={handleBlur}
    />
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


const renderButtonSubmit = (isValid, errors, handleSubmit, handleReset, setIsSubmit) => (
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
                date: ''
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
                {renderFieldTitle(handleChange, handleBlur, values, residences)}
                {isSubmit && errors.title && <ErrorField error={errors.title}/>}
         
                {renderFieldDescription(handleChange, handleBlur, values, residences)}
                {isSubmit && errors.description && <ErrorField error={errors.description}/>}
          
                {renderFieldDate(handleChange, handleBlur, values, residences)}
                {isSubmit && errors.date && <ErrorField error={errors.date}/>}
            
                {renderButtonSubmit(isValid, errors, handleSubmit, handleReset, setIsSubmit)}
            </div>
        )}
    </Formik>
    )
};

export default MeetingsForm;