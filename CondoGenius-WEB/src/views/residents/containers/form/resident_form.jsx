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
    birthday: Yup.string().ensure().required(requiredFieldMessage),
    residenceId: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values, createResident, updateResident, getResidents, history) => {
    let response;

    if (values.id) {
        response = await updateResident(values);
    } else {
        response = await createResident(values);
    }

    if (response.status === 201 || response.status === 200) {
        getResidents();
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

const renderFieldBirthday = (handleChange, handleBlur, values) => (
    <input 
        id="birthday"
        type="date" 
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.birthday} 
    />
);

const renderFieldResidenceNumber = (handleChange, handleBlur, values, residences) => (
    <select
        className="browser-default"
        name="residenceId"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.residenceId}
    >
        <option value="" disabled hidden>Selecione a residência</option>
        {
            residences?.map(residence => (
                <option
                    key={residence.id}
                    value={residence.id}
                >
                    Residência {residence.number}
                </option>
            ))
        }
    </select>
);

const renderButtonSubmit = (isValid, errors, handleSubmit, handleReset, setIsSubmit, isEdit) => (
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
        {isEdit ? 'Editar' : 'Cadastrar'}
    </Button>
);

const ResidentFormFields = ({residentEdited}) => {
    const residences = useSelector(state => state.residences.list);

    const [isSubmit, setIsSubmit] = useState(false);
    const [ , getResidents, createResident, updateResident,] = useResidents();
    const [ , getAllResidences ] = useResidences();
    const history = useHistory();

    let residenceId = residentEdited ? residences.find((residence) => residence.id === residentEdited.residence_id)?.id : '';

    const dateValue = residentEdited?.birthday ? new Date(residentEdited?.birthday) : null;

    let  birthday = dateValue instanceof Date && !isNaN(dateValue)
    ? dateValue.toISOString().split('T')[0] : '';

    useEffect(() => {
        getAllResidences();
    }, []);

    return (
        <Formik        
            initialValues={{
                id: residentEdited?.id ?? '',
                name: residentEdited?.name ?? '',
                lastName: residentEdited?.last_name ?? '',
                cpf: residentEdited?.cpf ?? '',
                contact: residentEdited?.contact ?? '',
                email: residentEdited?.email ?? '',
                birthday,
                residenceId,
            }}
            validationSchema={FormResidentSchema}
            onSubmit={values => {onSubmit(values, createResident, updateResident, getResidents, history)}}
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
                                        {isSubmit && errors.contact && <ErrorField error={errors.contact}/>}
                                    </div>
                                    <div class="input-field col s6">
                                        {renderFieldEmail(handleChange, handleBlur, values)}
                                        {isSubmit && errors.email && <ErrorField error={errors.email}/>}
                                    </div>
                                </form>
                            </div>
                            <div class="row">
                                <form class="col s12">
                                    <div class="input-field col s6">
                                        {renderFieldBirthday(handleChange, handleBlur, values)}
                                        {isSubmit && errors.birthday && <ErrorField error={errors.birthday}/>}
                                    </div>
                                    <div class="input-field col s6">
                                        {renderFieldResidenceNumber(handleChange, handleBlur, values, residences)}
                                        {isSubmit && errors.residenceId && <ErrorField error={errors.residenceId}/>}
                                    </div>
                                </form>
                            </div>
                            <div className='actions'>
                                {renderButtonSubmit(isValid, errors, handleSubmit, handleReset, setIsSubmit, residentEdited)}
                            </div>
                        </div>
                    </div>
            </div>
            )}
        </Formik>
    )
};

export default ResidentFormFields;