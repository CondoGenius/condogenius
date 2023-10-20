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
import useResidences from '../../states/residences/hooks/useResidences';
import useResidents from '../../states/residents/hooks/useResidents';
import { FormatDate } from '../../utils/utils';
import './profile.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormProfileSchema = Yup.object().shape({
    name: Yup.string().required(requiredFieldMessage),
    lastName: Yup.string().required(requiredFieldMessage),
    cpf: Yup.string().required(requiredFieldMessage),
    contact: Yup.string().required(requiredFieldMessage),
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
);

const renderButtonSubmit = (isValid, errors, handleSubmit, handleReset, setIsSubmit, isEdit) => (
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

    const { loadingResidences, getAllResidences } = useResidences();
    const { loadingResidents, updateProfile } = useResidents();
    
    useEffect(() => {
        getAllResidences();
    }, []);

    return (
        <>
            <Loading 
                show={
                    loadingResidences ||
                    loadingResidents
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
                            <span>Contatos</span>
                            <div className="itens_contact_content">
                                <Tooltip message={"Falar com um administrador via Whatsapp"}>
                                    <a href="https://api.whatsapp.com/send?phone=TELEFONE"><AiOutlineWhatsApp className='icon_whats'/></a>
                                </Tooltip>
                                <Tooltip message={"Falar com um administrador via e-mail"}>
                                    <a href="mailto:${hellen.gurgacz@gmail.com}"><AiOutlineMail className='icon_email'/></a>
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
                                        {renderButtonSubmit(isValid, errors, handleSubmit, handleReset, setIsSubmit)}
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