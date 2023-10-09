import React, { useState } from "react";
import { Formik } from 'formik';

import './resident_actions.scss';
import { Button } from "react-materialize";
import { MdAddBox } from 'react-icons/md';

import ModalContent from "../../../../components/modal/modal_content";
import ResidentFormFields from "../form/resident_form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useResidents from "../../../../states/residents/hooks/useResidents";
import useResidences from "../../../../states/residences/hooks/useResidences";

const onSubmit = (values) => {

};

const renderFieldFilterByName = (handleChange, handleBlur, values, setFilters, filters) => (
    <input 
        id="name"
        type="text"
        placeholder="Busque pelo nome do morador"
        onChange={(e) => {
            handleChange();
            setFilters({...filters, name: e.target.value})
        }}
        value={values.name} 
        handleBlur={handleBlur}
    />
);

const renderFieldFilterByCpf = (handleChange, handleBlur, values, setFilters, filters) => (
    <input 
        id="cpf"
        type="text"
        placeholder="Busque pelo CPF do morador"
        onChange={(e) => {
            handleChange();
            setFilters({...filters, cpf: e.target.value})
        }}
        value={values.cpf} 
        handleBlur={handleBlur}
    />
);

const renderFieldFilterByResidenceNumber = (handleChange, handleBlur, values, setFilters, filters, residences) => (
    <select
        className="browser-default"
        name="residenceId"
        onChange={(e) => {
            handleChange(); 
            setFilters({...filters, residence_id: e.target.value});
        }}
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


const renderButtonRegisterResident = () => (
    <ModalContent
        header="Cadastrar morador"
        trigger={<Button><MdAddBox /> Cadastrar novo morador</Button>}
        children={<ResidentFormFields/>}
        className="create"
    />
);

const ResidentActions = (filters, setFilters) => {
    const residences = useSelector(state => state.residences.list);

    const [ , getAllResidences ] = useResidences();
    const [ , getResidents , , , ] = useResidents();

    useEffect(() => {
        getResidents(filters);
    }, [filters]);

    useEffect(() => {
        getAllResidences();
    }, []);

    return (
        <Formik        
                initialValues={{
                    name: '',
                    cpf: '',
                    residenceId: ''
                }}
                onSubmit={values => {onSubmit(values)}}
            > 
                {({
                    handleChange,
                    handleBlur,
                    values
                }) => (
                    <div className="filter_content">
                        <div class="row">
                            <form class="col s12">
                                <div class="input-field col s3">
                                    {renderFieldFilterByName(handleChange, handleBlur, values, setFilters, filters)}
                                </div>
                                <div class="input-field col s3">
                                    {renderFieldFilterByCpf(handleChange, handleBlur, values, setFilters, filters)}
                                </div>
                                <div class="input-field col s3">
                                    {renderFieldFilterByResidenceNumber(handleChange, handleBlur, values, setFilters, filters, residences)}
                                </div>
                                <div class="input-field col s3 button_register_content">
                                    {renderButtonRegisterResident()}
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Formik>
    )
};

export default ResidentActions;