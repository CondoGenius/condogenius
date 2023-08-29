import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

import './resident_actions.scss';
import { Button } from "react-materialize";
import { MdAddBox } from 'react-icons/md';

const renderFieldFilterByName = () => (
    <input 
        id="name"
        type="text"
        placeholder="Busque pelo nome do morador"
        // onChange={}
        // value={} 
    />
);

const renderFieldFilterByCpf = () => (
    <input 
        id="cpf"
        type="text"
        placeholder="Busque pelo CPF do morador"
        // onChange={}
        // value={} 
    />
);

const renderFieldFilterByResidenceNumber = () => (
    <select class="browser-default">
        <option value="" disabled selected hidden>Selecione a residência</option>
        <option value="1">Residência 23</option>
        <option value="2">Residência 8</option>
        <option value="3">Residência 4</option>
    </select>
);

const renderButtonRegisterResident = () => (
    <NavLink to="/residents/new">
        <Button><MdAddBox /> Cadastrar novo morador</Button>
    </NavLink>
);

const ResidentActions = (filters, setFilters) => {

    return (
        <div className="filter_content">
            <div class="row">
                <form class="col s12">
                    <div class="input-field col s3">
                        {renderFieldFilterByName()}
                    </div>
                    <div class="input-field col s3">
                        {renderFieldFilterByCpf()}
                    </div>
                    <div class="input-field col s3">
                        {renderFieldFilterByResidenceNumber()}
                    </div>
                    <div class="input-field col s3 button_register_content">
                        {renderButtonRegisterResident()}
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ResidentActions;