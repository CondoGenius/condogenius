import { Formik } from 'formik';
import React, { useEffect, useState } from "react";
import { Button } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import person from '../../assets/person.png';
import Loading from '../../components/loading/loading';
import ErrorField from '../../components/utils/errorField';
import useResidences from '../../states/residences/hooks/useResidences';
import useResidents from '../../states/residents/hooks/useResidents';
import { FormatDateZone } from '../../utils/utils';
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

const onSubmit = async (values, createComplaint, getComplaintsByResindentId, resident) => {
    const response = await createComplaint(values);
  
    if (response?.status === 201) {
      document.getElementById('reset_form_complaint').click();
      toast.success("Reclamação enviada com sucesso.");
      getComplaintsByResindentId(resident.id);
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
         <Button
         id="reset_form_resident"
         className="display_none"
         onClick={() => {
           handleReset();
         }}
       />
    </div>
);

const Profile = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const resident = useSelector((state) => state.resident);
    const residences = useSelector((state) => state.residences);

    const { loadingResidences, getAllResidences } = useResidences();
    const { loadingResidents, updateResident } = useResidents();
    

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
                        
                    </div>
                    <Formik        
                        initialValues={{
                            id: resident.data.id,
                            name: resident.data.name,
                            lastName: resident.data.lastName,
                            cpf: resident.data.cpf,
                            contact: resident.data.contact,
                            email: resident.data.email,
                            birthday: FormatDateZone(resident.data.birthday),
                            residenceId: resident.data.residenceId,
                        }}
                        validationSchema={FormProfileSchema}
                        onSubmit={values => {onSubmit(values, updateResident)}}
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