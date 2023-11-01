import { Formik } from 'formik';
import React, { useRef, useState } from "react";
import { Button } from "react-materialize";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../components/utils/errorField';
import useHubDigital from '../../../states/hub_diigtal/hooks/useHubDigital';

import './survey_form.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormSurveySchema = Yup.object().shape({
    description: Yup.string().ensure().required(requiredFieldMessage),
    inputOpctionsValues: Yup.array().min(2, 'Ao menos duas opções devem ser preenchidas')
});

const onSubmit = async (values, resetForm, createSurvey, getPublications) => {
    console.log("submit")
    const response = await createSurvey(values);

    if (response.status === 201) {
        toast.success("Enquete publicada com sucesso.");
        resetForm();
        getPublications();
    }
}

const SurveyForm = () => {
    let [options, setOptions] = useState(2);
    const [inputOpctionsValues, setInputOpctionsValues] = useState(Array(options).fill(""));

    const user = useSelector((state => state.user.data));
    const { createSurvey, getPublications } = useHubDigital();
  
    const optionElements = [];
  
    const optionsElement = useRef([]);
  
    const handleChangeOption = (index, value) => {
      const newInputValues = [...inputOpctionsValues];
      newInputValues[index] = value;
      setInputOpctionsValues(newInputValues);
    };
  
    for (let i = 0; i < options; i++) {
      optionElements.push(
        <div key={i}>
          Opção {i + 1}:
          <input
            type="text"
            name="options"
            ref={(el) => (optionsElement.current[i] = el)}
            value={inputOpctionsValues[i]}
            onChange={(e) => handleChangeOption(i, e.target.value)}
          />
        </div>
      );
    }

    return (
        <Formik        
            initialValues={{
                userId: user.id,
                description: '',
                inputOpctionsValues: []
            }}
            validationSchema={FormSurveySchema}
            onSubmit={(values, {resetForm}) => {onSubmit(values, resetForm, createSurvey, getPublications)}}
            > 
            {({
                handleChange,
                values,
                handleSubmit,
                errors
            }) => (
                <div className="survey_content">
                    <div className="survey_form">
                        <label>
                            Sua pergunta*
                        </label>
                        <input 
                            id="description"
                            onChange={handleChange}
                            value={values.description}
                        />
                        {errors.description && <ErrorField error={errors.description}/>}
                        {optionElements}
                        {errors.options && <ErrorField error={errors.options}/>}
                    </div>
                    <div className="survey_actions">
                        {/* <Button onClick={() => setOptions(options++)}>Adicionar opção</Button> */}
                        <Button onClick={() => {handleSubmit(); console.log("opa")}}>Compartilhar enquete</Button>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default SurveyForm;