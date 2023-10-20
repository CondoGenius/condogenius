import { Formik } from 'formik';
import { toast } from 'materialize-css';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-materialize';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import ErrorField from '../../../../components/utils/errorField';
import useResidences from "../../../../states/residences/hooks/useResidences";
import useResidents from "../../../../states/residents/hooks/useResidents";
import { CpfMask, FormatDate, PhoneMask } from '../../../../utils/utils';
import './resident_form.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormResidentSchema = Yup.object().shape({
    name: Yup.string().ensure().required(requiredFieldMessage),
    lastName: Yup.string().ensure().required(requiredFieldMessage),
    cpf: Yup.string().required(requiredFieldMessage).min(13, 'O CPF deve ter 11 dígitos.'),
    contact: Yup.string().required(requiredFieldMessage).min(14, 'O contato deve ter no mínimo 10 dígitos.'),
    email: Yup.string().ensure().required(requiredFieldMessage),
    birthday: Yup.string().ensure().required(requiredFieldMessage),
    residenceId: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values, createResident, updateResident, getResidents, history) => {
    let response;
    let messageSuccess;

    if (values.id) {
        response = await updateResident(values);
        messageSuccess = "Morador atualizado com sucesso.";
    } else {
        response = await createResident(values);
        messageSuccess = "Morador cadastrado com sucesso.";
    }

    if (response.status === 201 || response.status === 200) {
        document.getElementById('reset_form_resident').click();
        toast.success(messageSuccess);
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
        value={CpfMask(values.cpf)} 
        maxLength={13}
    />
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
            {isEdit ? 'Editar' : 'Cadastrar'}
        </Button>
         <Button
         id="reset_form_resident"
         className="display_none"
         onClick={() => {
           handleReset();
         }}
       />
    </div>
);

const ResidentFormFields = ({residentEdited}) => {
    const residences = useSelector(state => state.residences.list);

    const [isSubmit, setIsSubmit] = useState(false);
    const { getResidents, createResident, updateResident } = useResidents();
    const { getAllResidences } = useResidences();
    const history = useHistory();

    let residenceId = residentEdited ? residences.find((residence) => residence.id === residentEdited.residence_id)?.id : '';

    const birthday = residentEdited?.birthday ? FormatDate(residentEdited?.birthday) : null;

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