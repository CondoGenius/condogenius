import React, { useState } from "react";
import { Collection, CollectionItem, Button } from 'react-materialize';

import { MdEdit } from 'react-icons/md'
import { MdRemoveCircleOutline } from 'react-icons/md'

import {listResidents} from '../../mock';
import ModalContent from "../../../modal/modal_content";
import ResidentForm from "../form/resident_form";

import './residentList.scss';
import ResidentFormFields from "../form/resident_form_fields";

const ResidentList = () => {
    return (
        <div className='list_residents'>
            <Collection>
            <CollectionItem key="header" className='list_header'>
                <span>Nome</span>
                <span>Residência</span>
                <span>E-mail</span>
                <span>CPF</span>
                <span className='icon'></span>
                <span className='icon'></span>
            </CollectionItem>
            {listResidents.map(resident => (
                <CollectionItem key={resident.id}>
                    <span>
                    {resident.name}
                    </span>
                    <span>
                    {resident.residence}
                    </span>
                    <span>
                    {resident.email}
                    </span>
                    <span>
                    {resident.cpf}
                    </span> 
                    <span className='icon'>
                        <ModalContent 
                            header="Editar morador"
                            trigger={<MdEdit />}
                            children={<ResidentFormFields tittle="Editar morador" residentEdited={resident}/>}
                            action="update"
                        />
                    </span>
                    <span className='icon'>
                    <ModalContent 
                            header="Excluir morador"
                            trigger={<MdRemoveCircleOutline />}
                            children={<div>Tem certeza que deseja remover {resident.name} como morador do condomínio?</div>}
                            action="delete"
                        />
                    </span>
                </CollectionItem>
            ))}
            </Collection>
      </div>
    )
};

export default ResidentList;