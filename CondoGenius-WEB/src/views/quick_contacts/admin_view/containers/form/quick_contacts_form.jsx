import { Formik } from 'formik';
import { toast } from 'materialize-css';
import React, { useState } from 'react';
import { Button } from 'react-materialize';
import * as Yup from 'yup';
import ErrorField from '../../../../../components/utils/errorField';
import useQuickContacts from '../../../../../states/quick_contacts/hooks/useQuickContacts';
import { PhoneMask } from '../../../../../utils/utils';
const requiredFieldMessage = 'Este campo é obrigatório';
const FormResidentSchema = Yup.object().shape({
    name: Yup.string().ensure().required(requiredFieldMessage),
    type: Yup.string().ensure().required(requiredFieldMessage),
    contact: Yup.string().required(requiredFieldMessage).min(14, 'O contato deve ter no mínimo 10 dígitos.'),
});

const onSubmit = async (values, createQuickContact, getQuickContacts) => {

    const response = await createQuickContact(values);

    if (response.status === 201 || response.status === 200) {
        document.getElementById('reset_form_quick_contact').click();
        toast.success("Contato cadastrado com sucesso");
        getQuickContacts();
    }
};

const renderFieldName = (handleChange, handleBlur, values) => (
    <input 
        id="name"
        type="text"
        placeholder="Digite o nome do contato"
        onChange={handleChange}
        value={values.name}
        handleBlur={handleBlur}
    />
);

const renderFieldType = (handleChange, handleBlur, values) => (
    <select
        className="browser-default"
        name="residenceId"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.residenceId}
    >
        <option value="" disabled hidden>Selecione a residência</option>
        <option value="academia">Academia</option>
        <option value="comida">Comida</option>
       
    </select>
);

const renderFieldContact = (handleChange, handleBlur, values) => (
    <input 
        id="contact"
        type="text" 
        placeholder="Digite o contato com DDD"
        onChange={handleChange}
        onBlur={handleBlur}
        value={PhoneMask(values.contact)}
        maxLength={15}
    />
);

const renderButtonSubmit = (isValid, handleSubmit, handleReset, setIsSubmit) => (
    <div>
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
            Cadastrar
        </Button>
         <Button
         id="reset_form_quick_contact"
         className="display_none"
         onClick={() => {
           handleReset();
        }}
       />
    </div>
);

const QuickContactsFormFields = () => {

    const [isSubmit, setIsSubmit] = useState(false);
    const { createQuickContact, getQuickContacts } = useQuickContacts();

    return (
        <Formik        
            initialValues={{
                type: '',
                name: '',
                contact: '',
               
            }}
            validationSchema={FormResidentSchema}
            onSubmit={values => {onSubmit(values, createQuickContact, getQuickContacts)}}
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
                                    {renderFieldType(handleChange, handleBlur, values)}
                                    {isSubmit && errors.type && <ErrorField error={errors.type}/>}
                                </div>
                                <div class="input-field col s6">
                                    {renderFieldName(handleChange, handleBlur, values)}
                                    {isSubmit && errors.name && <ErrorField error={errors.name}/>}
                                </div>
                            </form>
                        </div>
                        <div className="row">
                            <form class="col s12">
                                <div class="input-field col s12">
                                    {renderFieldContact(handleChange, handleBlur, values)}
                                    {isSubmit && errors.contact && <ErrorField error={errors.contact}/>}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='actions'>
                        {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit)}
                     </div>
                </div>
            )}
        </Formik>
    )
};

export default QuickContactsFormFields;