import React from "react";
import { Collection, CollectionItem } from 'react-materialize';

import { MdEdit } from 'react-icons/md'
import { MdRemoveCircleOutline } from 'react-icons/md'

import {listResidents} from '../../mock';

import './residentList.scss';

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
                    <MdEdit />
                    </span>
                    <span className='icon'>
                    <MdRemoveCircleOutline />
                    </span>
                </CollectionItem>
            ))}
            </Collection>
      </div>
    )
};

export default ResidentList;