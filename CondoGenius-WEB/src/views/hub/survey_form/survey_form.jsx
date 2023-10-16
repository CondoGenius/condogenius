import { Formik } from 'formik';
import React, { useRef, useState } from "react";
import { Button } from "react-materialize";
import * as Yup from 'yup';

import './survey_form.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormSurveySchema = Yup.object().shape({
    question: Yup.string().ensure().required(requiredFieldMessage),
    options: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values) => {
   
}

const SurveyForm = () => {
    let [options, setOptions] = useState(2);
    const [inputValues, setInputValues] = useState(Array(options).fill(""));
  
    const optionElements = [];
  
    const optionsElement = useRef([]);
  
    const handleChangeOption = (index, value) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);
    };
  
    for (let i = 0; i < options; i++) {
      optionElements.push(
        <div key={i}>
          Opção {i + 1}:
          <input
            type="text"
            name="options"
            ref={(el) => (optionsElement.current[i] = el)}
            value={inputValues[i]}
            onChange={(e) => handleChangeOption(i, e.target.value)}
          />
        </div>
      );
    }

    return (
        <Formik        
                initialValues={{
                    question: '',
                    options: []
                }}
                validationSchema={FormSurveySchema}
                onSubmit={values => {onSubmit(values)}}
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
                    <div className="survey_content">
                        <div className="survey_form">
                            <label>
                                Sua pergunta*
                            </label>
                            <input />
                            {optionElements}
                        </div>
                        <div className="survey_actions">
                            <Button onClick={() => setOptions(options++)}>Adicionar opção</Button>
                            <Button>Compartilhar enquete</Button>
                        </div>
                    </div>
                )}
            </Formik>
    );
};

export default SurveyForm;