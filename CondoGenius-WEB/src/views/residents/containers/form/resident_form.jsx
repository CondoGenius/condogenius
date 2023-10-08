import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

import ErrorField from '../../../../components/utils/errorField';
import { Button } from 'react-materialize';

import useResidents from "../../../../states/residents/hooks/useResidents";
import useResidences from "../../../../states/residences/hooks/useResidences";

import './resident_form.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormResidentSchema = Yup.object().shape({
    name: Yup.string().ensure().required(requiredFieldMessage),
    lastName: Yup.string().ensure().required(requiredFieldMessage),
    cpf: Yup.string().ensure().required(requiredFieldMessage),
    contact: Yup.string().ensure().required(requiredFieldMessage),
    email: Yup.string().ensure().required(requiredFieldMessage),
    birth: Yup.string().ensure().required(requiredFieldMessage),
    residenceNumber: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values, createResident, getAllResidents, history) => {
    const response = await createResident(values);
    if(response.status === 201) {
        getAllResidents();
    }
};

const renderFieldName = (handleChange, handleBlur, values) => (
    <input 
        id="name"
        type="text" 
        placeholder="Digite o nome"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name} 
    />
);

const renderFieldLastName = (handleChange, handleBlur, values) => (
    <input 
        id="lastName"
        type="text" 
        placeholder="Digite o sobrenome"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.lastName} 
    />
);

const renderFieldCpf = (handleChange, handleBlur, values) => (
    <input 
        id="cpf"
        type="text" 
        placeholder="Digite o CPF"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.cpf} 
    />
);

const renderFieldContact = (handleChange, handleBlur, values) => (
    <input 
        id="contact"
        type="text" 
        placeholder="Digite o contato"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.contact} 
    />
);

const renderFieldEmail = (handleChange, handleBlur, values) => (
    <input 
        id="email"
        type="text" 
        placeholder="Digite o e-mail"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email} 
    />
);

const renderFieldBirth = (handleChange, handleBlur, values) => (
    <input 
        id="birth"
        type="date" 
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.birth} 
    />
);

const renderFieldResidenceNumber = (handleChange, handleBlur, values, residences) => (
    <select 
        class="browser-default"
        name="residenceNumber"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.residenceNumber}
    >
        <option value="" disabled selected hidden>Selecione a residência</option>
        {
            residences?.map(residence => (
                <option value={residence.id}>Residência {residence.number}</option>
            ))
        }
    </select>
);

const renderButtonSubmit = (isValid, handleSubmit, handleReset, setIsSubmit, isEdit) => (
    <Button 
        type="submit"
        onClick={() => {
            setIsSubmit(true);
            if (isValid) {
                handleSubmit();
            }
        }}
    >
        {isEdit ? 'Editar' : 'Cadastrar'}
    </Button>
);

const ResidentFormFields = ({residentEdited}) => {
    const residences = useSelector(state => state.residences.list);

    const [isSubmit, setIsSubmit] = useState(false);
    const [ , getAllResidents, createResident, ,] = useResidents();
    const [ , getAllResidences ] = useResidences();
    const history = useHistory();

    useEffect(() => {
        getAllResidences();
    }, []);

    return (
        <Formik        
            initialValues={{
                name: residentEdited?.name ?? '',
                lastName: residentEdited?.last_name ?? '',
                cpf: residentEdited?.cpf ?? '',
                contact: residentEdited?.contact ?? '',
                email: residentEdited?.email ?? '',
                birth: residentEdited?.birth ?? '',
                residenceNumber: residentEdited?.residence_number ?? ''
            }}
            validationSchema={FormResidentSchema}
            onSubmit={values => {onSubmit(values, createResident, getAllResidents, history)}}
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
                    <div className='person_fields'>
                        <div className='fields'>
                            <div class="row">
                                <form class="col s12">
                                    <div class="input-field col s4">
                                        {renderFieldName(handleChange, handleBlur, values)}
                                        {isSubmit && errors.name && <ErrorField error={errors.name}/>}
                                    </div>
                                    <div class="input-field col s4">
                                        {renderFieldLastName(handleChange, handleBlur, values)}
                                        {isSubmit && errors.lastName && <ErrorField error={errors.lastName}/>}
                                    </div>
                                    <div class="input-field col s4">
                                        {renderFieldCpf(handleChange, handleBlur, values)}
                                        {isSubmit && errors.cpf && <ErrorField error={errors.cpf}/>}
                                    </div>
                                </form>
                            </div>
                            <div class="row">
                                <form class="col s12">
                                    <div class="input-field col s6">
                                        {renderFieldContact(handleChange, handleBlur, values)}
                                        {isSubmit && errors.name && <ErrorField error={errors.name}/>}
                                    </div>
                                    <div class="input-field col s6">
                                        {renderFieldEmail(handleChange, handleBlur, values)}
                                        {isSubmit && errors.name && <ErrorField error={errors.name}/>}
                                    </div>
                                </form>
                            </div>
                            <div class="row">
                                <form class="col s12">
                                    <div class="input-field col s6">
                                        {renderFieldBirth(handleChange, handleBlur, values)}
                                        {isSubmit && errors.birth && <ErrorField error={errors.birth}/>}
                                    </div>
                                    <div class="input-field col s6">
                                        {renderFieldResidenceNumber(handleChange, handleBlur, values, residences)}
                                        {isSubmit && errors.residenceNumber && <ErrorField error={errors.residenceNumber}/>}
                                    </div>
                                </form>
                            </div>
                            <div className='actions'>
                                {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit, residentEdited)}
                            </div>
                        </div>
                    </div>
            </div>
            )}
        </Formik>
    )
};

export default ResidentFormFields;