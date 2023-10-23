import { Formik } from 'formik';
import React, { useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai';
import { Button } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import person from '../../assets/person.png';
import Loading from '../../components/loading/loading';
import Tooltip from '../../components/tooltip/tooltip';
import ErrorField from '../../components/utils/errorField';
import useCondominium from '../../states/condominium/hooks/useCondominium';
import useResidences from '../../states/residences/hooks/useResidences';
import useResidents from '../../states/residents/hooks/useResidents';
import { CpfMask, FormatDate, PhoneMask } from '../../utils/utils';
import './profile.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormProfileSchema = Yup.object().shape({
    name: Yup.string().required(requiredFieldMessage),
    lastName: Yup.string().required(requiredFieldMessage),
    cpf: Yup.string().required(requiredFieldMessage).min(13, 'O CPF deve ter 11 dígitos.'),
    contact: Yup.string().required(requiredFieldMessage).min(14, 'O contato deve ter no mínimo 10 dígitos.'),
    email: Yup.string().ensure().required(requiredFieldMessage),
    birthday: Yup.string().ensure().required(requiredFieldMessage),
});

const onSubmit = async (values, updateProfile) => {
    const response = await updateProfile(values);
  
    if (response?.status === 200) {
      toast.success("Perfil atualizado com sucesso.");
    }
};

const renderFieldName = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="name"
            type="text" 
            placeholder="Digite o nome"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name} 
        />
        <label for="name" class="active">Nome</label>
    </div>
);

const renderFieldLastName = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="lastName"
            type="text" 
            placeholder="Digite o sobrenome"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName} 
        />
        <label for="lastName" class="active">Sobrenome</label>
    </div>
);

const renderFieldCpf = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="cpf"
            type="text" 
            placeholder="Digite o CPF"
            onChange={handleChange}
            onBlur={handleBlur}
            value={CpfMask(values.cpf)} 
            maxLength={13}
        />
        <label for="lastName" class="active">CPF</label>
    </div>
);

const renderFieldContact = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="contact"
            type="text" 
            placeholder="Digite o contato com DDD"
            onChange={handleChange}
            onBlur={handleBlur}
            value={PhoneMask(values.contact)}
            maxLength={15}
        />
        <label for="contact" class="active">Contato</label>
    </div>

);

const renderFieldEmail = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="email"
            type="text" 
            placeholder="Digite o e-mail"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email} 
        />
        <label for="email" class="active">E-mail</label>
    </div>
);

const renderFieldBirthday = (handleChange, handleBlur, values) => (
    <div class="input-field">
        <input 
            id="birthday"
            type="date" 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.birthday} 
        />
        <label for="birthday" class="active">Data de nascimento</label>
    </div>

);

const renderFieldResidenceNumber = (handleChange, handleBlur, values, residences) => (
    <div>
        <label for="residence" class="active">Residência</label>
        <select
            id="residence"
            className="browser-default"
            name="residenceId"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.residenceId}
            disabled={true}
        >
            <option value="" disabled hidden>Selecione a residência</option>
            {
                residences?.map(residence => (
                    <option
                        key={residence.id}
                        value={residence.id}
                        disabled={true}
                    >
                        Residência {residence.number}
                    </option>
                ))
            }
        </select>
    </div>

);

const renderButtonSubmit = (values,isValid, errors, handleSubmit, handleReset, setIsSubmit, isEdit) => (
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
            Salvar
        </Button>
    </div>
);

const Profile = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const resident = useSelector((state) => state.resident);
    const residences = useSelector((state) => state.residences);
    const user = useSelector((state) => state.user);
    const condominium = useSelector((state) => state.condominium);

    const { loadingResidences, getAllResidences } = useResidences();
    const { loadingResidents, updateProfile } = useResidents();
    const { loadingCondominium, getInfoCondominiumByUserId } = useCondominium();
    
    useEffect(() => {
        getAllResidences();
        getInfoCondominiumByUserId(user.data.id);
    }, []);

    useEffect(() => {
        toast.error(resident.error)
    }, [resident.error]);

    useEffect(() => {
        toast.error(residences.error)
    }, [residences.error]);

    useEffect(() => {
        toast.error(user.error)
    }, [user.error]);

    useEffect(() => {
        toast.error(condominium.error)
    }, [condominium.error]);

    return (
        <>
            <Loading 
                show={
                    loadingResidences ||
                    loadingResidents ||
                    loadingCondominium
                }
            />
            <div>
                <div className='header_content'>
                    <h1>Perfil</h1>    
                </div>
                <div className='profile_content'>
                    <div className="image_content">
                        <img src={person}/>
                        <div className='contacts_content'>
                            <span>Contatos úteis</span>
                            <div className="itens_contact_content">
                                <Tooltip message={"Falar com um administrador via Whatsapp"}>
                                    <a href={`https://api.whatsapp.com/send?phone=${condominium.data?.phone}`}><AiOutlineWhatsApp className='icon_whats'/></a>
                                </Tooltip>
                                <Tooltip message={"Falar com um administrador via e-mail"}>
                                    <a href={`mailto:${condominium.data?.email}`}><AiOutlineMail className='icon_email'/></a>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            id: resident.data.id,
                            name: resident.data.name,
                            lastName: resident.data.lastName,
                            cpf: resident.data.cpf,
                            contact: resident.data.contact,
                            email: resident.data.email,
                            birthday: FormatDate(resident.data.birthday),
                            residenceId: resident.data.residenceId,
                        }}
                        validationSchema={FormProfileSchema}
                        onSubmit={values => {onSubmit(values, updateProfile)}}
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
                            <div className="profile_form_content">
                                <div className='fields'>
                                    <div class="row">
                                        <form class="col s12">
                                            <div class="input-field col s6">
                                                {renderFieldName(handleChange, handleBlur, values)}
                                                {isSubmit && errors.name && <ErrorField error={errors.name}/>}
                                            </div>
                                            <div class="input-field col s6">
                                                {renderFieldLastName(handleChange, handleBlur, values)}
                                                {isSubmit && errors.lastName && <ErrorField error={errors.lastName}/>}
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
                                                {renderFieldCpf(handleChange, handleBlur, values)}
                                                {isSubmit && errors.cpf && <ErrorField error={errors.cpf}/>}
                                            </div>
                                        </form>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            {renderFieldEmail(handleChange, handleBlur, values)}
                                            {isSubmit && errors.email && <ErrorField error={errors.email}/>}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <form class="col s12">
                                            <div class="input-field col s6">
                                                {renderFieldBirthday(handleChange, handleBlur, values)}
                                                {isSubmit && errors.birthday && <ErrorField error={errors.birthday}/>}
                                            </div>
                                            <div class="input-field col s6">
                                                {renderFieldResidenceNumber(handleChange, handleBlur, values, residences.list)}
                                                {isSubmit && errors.residenceId && <ErrorField error={errors.residenceId}/>}
                                            </div>
                                        </form>
                                    </div>
                                    <div className='actions'>
                                        {renderButtonSubmit(values,isValid, errors, handleSubmit, handleReset, setIsSubmit)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
};

export default Profile;