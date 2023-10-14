import { Formik } from 'formik';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from 'yup';

import { Button } from "react-materialize";
import ErrorField from '../../../../../components/utils/errorField';
import useDeliveries from "../../../../../states/deliveries/hooks/useDeliveries";
import useResidences from "../../../../../states/residences/hooks/useResidences";

const requiredFieldMessage = 'Este campo é obrigatório';
const FormResidentSchema = Yup.object().shape({
    residenceId: Yup.string().ensure().required(requiredFieldMessage)
});

const onSubmit = async (values, createDelivery, getDeliveries) => {
    const response = await createDelivery(values);

    if (response.status === 201) {
        getDeliveries();
    }
};

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

const renderButtonSubmit = (isValid, errors, handleSubmit, handleReset, setIsSubmit) => (
    <Button 
        onClick={(e) => {
            setIsSubmit(true);
            if (isValid) {
                e.preventDefault();
                handleSubmit();
            }
        }}
    >
        Cadastrar entrega
    </Button>
);

const DeliveriesActions = () => {
    const residences = useSelector(state => state.residences.list);
    const user = useSelector(state => state.user.data);
    
    const [ , getAllResidences ] = useResidences();
    const [ , , getDeliveries, createDelivery ,] = useDeliveries();

    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        getAllResidences();
    }, []);

    return (
        <Formik        
            initialValues={{
                userId: user.id,
                residenceId: '',
            }}
            validationSchema={FormResidentSchema}
            onSubmit={values => {onSubmit(values, createDelivery, getDeliveries)}}
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
            <div className="filter_content">
                <div class="row">
                    <form class="col s12">
                        <div class="input-field col s3">
                            {renderFieldResidenceNumber(handleChange, handleBlur, values, residences)}
                            {isSubmit && errors.residenceId && <ErrorField error={errors.residenceId}/>}
                        </div>
                        
                        <div class="input-field col s3">
                            {renderButtonSubmit(isValid, errors, handleSubmit, handleReset, setIsSubmit)}
                        </div>
                    </form>
                </div>
            </div>
        )}
        </Formik>
    )
};

export default DeliveriesActions;