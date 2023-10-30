import { Formik } from 'formik';
import React from "react";
import { AiOutlineProject } from "react-icons/ai";
import { Button } from "react-materialize";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import person from '../../../assets/person.png';
import ModalContent from "../../../components/modal/modal_content";
import ErrorField from '../../../components/utils/errorField';
import useHubDigital from "../../../states/hub_diigtal/hooks/useHubDigital";
import SurveyForm from "../survey_form/survey_form";

import './form_publication.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormPublicationSchema = Yup.object().shape({
    description: Yup.string().ensure().required(requiredFieldMessage),
});

const onSubmit = async (values, createPublication, getPublications, resetForm) => {
    const response = await createPublication(values);

    if (response.status === 201) {
        toast.success("Publicação realizada com sucesso.");
        resetForm();
        getPublications();
    }
}

const FormPublication = () => {
    const isAdmin = useSelector((state => state.user.data.isAdmin));
    const user = useSelector((state => state.user.data));

    const {  createPublication, getPublications } = useHubDigital();

    return (
        <div>
            <div className="new_publication">
                <div className="icon_person_content">
                    <img src={person} />
                </div>
                <div className="form_publication">
                    <Formik        
                    initialValues={{
                        userId: user.id,
                        description: ''
                    }}
                    validationSchema={FormPublicationSchema}
                    onSubmit={(values, {resetForm}) => {onSubmit(values, createPublication, getPublications, resetForm)}}
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
                        <>
                            <div>
                                <textarea 
                                    id="description"
                                    placeholder="Compartilhe avisos, notícias e informações relevantes à comunidade do condomínio"
                                    onChange={handleChange}
                                    value={values.description}
                                />
                                {errors.description && <ErrorField error={errors.description}/>}
                            </div>
                            <div className="actions_publication">
                                {isAdmin && (
                                    <ModalContent
                                        header={`Criar enquete`}
                                        trigger={
                                            <div className="survey_content">
                                                <AiOutlineProject />Criar enquete
                                            </div>
                                        }
                                        children={<SurveyForm />}
                                    />
                                )}
                                <Button onClick={handleSubmit}>Compartilhar publicação</Button>
                        </div>
                        </>
                    )}
                </Formik>
                </div>
            </div>
            
        </div>
    );
};

export default FormPublication;