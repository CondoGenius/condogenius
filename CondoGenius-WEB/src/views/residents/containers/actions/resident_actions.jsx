import { Formik } from 'formik';
import React, { useEffect } from "react";
import { Button } from "react-materialize";
import { useSelector } from "react-redux";

import { FiRefreshCcw } from 'react-icons/fi';
import { MdAddBox } from 'react-icons/md';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

import ModalContent from "../../../../components/modal/modal_content";
import Tooltip from "../../../../components/tooltip/tooltip";
import useResidences from "../../../../states/residences/hooks/useResidences";
import ResidentFormFields from "../form/resident_form";

import { CpfMask } from '../../../../utils/utils';
import './resident_actions.scss';

const onSubmit = (values, setFilters) => {
    setFilters({
        name: values.name !== '' ? values.name : null,
        cpf: values.cpf !== '' ? values.cpf :  null,
        residenceId: values.residenceId !== '' ? values.residenceId : null
    });
};

const clearFilters = (e, setFilters, handleReset) => {
    e.preventDefault();
    setFilters({name: null, cpf: null, residenceId: null});
    handleReset();
};

const renderFieldFilterByName = (handleChange, handleBlur, values) => (
    <input 
        id="name"
        type="text"
        placeholder="Busque pelo nome do morador"
        onChange={handleChange}
        value={values.name}
        handleBlur={handleBlur}
    />
);

const renderFieldFilterByCpf = (handleChange, handleBlur, values) => (
    <input 
        id="cpf"
        type="text"
        placeholder="Busque pelo CPF do morador"
        onChange={handleChange}
        value={CpfMask(values.cpf)} 
        maxLength={13}
        handleBlur={handleBlur}
    />
);

const renderFieldFilterByResidenceNumber = (handleChange, handleBlur, values, residences) => (
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


const renderButtonRegisterResident = () => (
    <ModalContent
        header="Cadastrar morador"
        trigger={<Button className='button_content_open_modal'><MdAddBox /> Cadastrar morador</Button>}
        children={<ResidentFormFields/>}
    />
);

const ResidentActions = ({filters, setFilters}) => {
    const residences = useSelector(state => state.residences.list);

    const { getAllResidences } = useResidences();

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
            onSubmit={(values) => onSubmit(values, setFilters)}
        > 
            {({
                handleChange,
                handleBlur,
                values,
                handleSubmit,
                handleReset
            }) => (
                <div className="filter_content">
                    <div class="row">
                        <form class="col s12">
                            <div class="input-field col s3">
                                {renderFieldFilterByName(handleChange, handleBlur, values)}
                            </div>
                            <div class="input-field col s3">
                                {renderFieldFilterByCpf(handleChange, handleBlur, values)}
                            </div>
                            <div class="input-field col s3">
                                {renderFieldFilterByResidenceNumber(handleChange, handleBlur, values, residences)}
                            </div>
                            <div class="input-field col s05">
                                <Tooltip
                                    message={"Pesquisar"}
                                >
                                    <PiMagnifyingGlassBold className="magnifying_glass_icon" onClick={handleSubmit}/>
                                </Tooltip>
                            </div>
                            <div class="input-field col s05">
                                <Tooltip
                                    message={"Limpar filtros"}
                                >
                                    <FiRefreshCcw className="refresh_icon" onClick={(e) => clearFilters(e, setFilters, handleReset)} />
                                </Tooltip>
                            </div>
                            <div class="input-field col s2 button_register_content">
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