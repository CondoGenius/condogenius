import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from "react";
import { MdRemoveCircleOutline } from 'react-icons/md';
import { Button } from "react-materialize";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../components/utils/errorField';
import useHubDigital from '../../../states/hub_diigtal/hooks/useHubDigital';

import './survey_form.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormSurveySchema = Yup.object().shape({
    userId: Yup.number().required(),
    description: Yup.string().ensure().required(requiredFieldMessage),
    inputOptionsValues: Yup.array().of(Yup.string()).min(2, 'Ao menos duas opções devem ser preenchidas')
});

const SurveyForm = () => {
    const [options, setOptions] = useState(2);
    const [inputOptionsValues, setInputOptionsValues] = useState(Array(options).fill(""));

    const user = useSelector((state => state.user.data));
    const { createSurvey, getPublications } = useHubDigital();

    const handleChangeOption = (index, value) => {
        setInputOptionsValues(prevValues => {
            const newInputValues = [...prevValues];
            newInputValues[index] = value;
            return newInputValues;
        });
    };

    const handleChangeOptionDelete = (index) => {
        setInputOptionsValues(prevValues => {
            const newInputValues = [...prevValues];
            newInputValues.splice(index, 1);
            return newInputValues;
        });
    };

    const handleAddOption = () => {
        setOptions(prevOptions => prevOptions + 1);
        setInputOptionsValues(prevValues => [...prevValues, ""]);
    };

    const onSubmit = async (values, resetForm) => {
        const response = await createSurvey({...values, inputOptionsValues: inputOptionsValues});

        if (response.status === 201) {
            resetForm();
            setInputOptionsValues(Array(options).fill(""));
            toast.success("Enquete publicada com sucesso.");
        }

        getPublications();
    };

    return (
        <Formik        
            initialValues={{
                userId: user.id,
                description: '',
                inputOptionsValues: inputOptionsValues
            }}
            validationSchema={FormSurveySchema}
            onSubmit={(values, {resetForm}) => onSubmit(values, resetForm)}
        > 
            {({
                handleChange,
                values,
                handleSubmit,
                errors
            }) => (
                <Form className="survey_content" onSubmit={handleSubmit}>
                    <div className="survey_form">
                        <label htmlFor="description">
                            Sua pergunta
                        </label>
                        <Field 
                            type="text"
                            id="description"
                            name="description"
                            onChange={handleChange}
                            value={values.description}
                        />
                        <ErrorMessage name="description" component={ErrorField} />
                        {inputOptionsValues.map((value, i) => (
                            <div className='options_content_form'>
                                <div key={i} className='option_form'>
                                    Opção {i + 1}:
                                    <input
                                        type="text"
                                        name={`inputOptionsValues.${i}`}
                                        value={value}
                                        onChange={(e) => handleChangeOption(i, e.target.value)}
                                    />
                                </div>
                                <MdRemoveCircleOutline onClick={(e) =>  handleChangeOptionDelete(i, e.target.value)}/>
                            </div>
                        ))}
                        <ErrorMessage name="inputOptionsValues" component={ErrorField} />
                    </div>
                    <div className="survey_actions">
                        <Button type="button" onClick={handleAddOption}>Adicionar opção</Button>
                        <Button 
                            type="submit" 
                            modal='close'
                        >
                            Compartilhar enquete
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SurveyForm;
