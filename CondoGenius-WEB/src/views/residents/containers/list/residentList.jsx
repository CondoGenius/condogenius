import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Collection, CollectionItem, Button } from 'react-materialize';

import { MdEdit } from 'react-icons/md';
import { MdRemoveCircleOutline } from 'react-icons/md';

import ModalContent from "../../../../components/modal/modal_content";
import Loading from "../../../../components/loading";

import './residentList.scss';
import ResidentFormFields from "../form/resident_form";

import useResidents from "../../../../states/residents/hooks/useResidents";

const ResidentList = () => {
    const [ loadingResidents, getAllResidents, , , deleteResident] = useResidents();

    const residents = useSelector((state) => state.residents);

    useEffect(() => {
        getAllResidents();
    }, []);

    const deleteResidentSubmit = async (id) => {
        const response = await deleteResident(id);
        if(response.status === 200) {
            getAllResidents();
        }
    };

    return (
        <div>
            <Loading
                show={
                    loadingResidents
                }
            />
            <div className='content_residents'>
                <div className='list_view'>
                    <Collection>
                    <CollectionItem key="header" className='list_header'>
                        <span>Nome</span>
                        <span>Residência</span>
                        <span>E-mail</span>
                        <span>CPF</span>
                        <span className='icon'></span>
                        <span className='icon'></span>
                    </CollectionItem>
                    {residents?.list?.map(resident => (
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
                                    children={<ResidentFormFields residentEdited={resident}/>}
                                    className="update"
                                />
                            </span>
                            <span className='icon'>
                            <ModalContent 
                                    header="Excluir morador"
                                    trigger={<MdRemoveCircleOutline />}
                                    children={
                                        <div>
                                            <div>Tem certeza que deseja remover {resident.name} como morador do condomínio?</div>
                                            <div className="button_delete_resident_content">
                                                <Button modal="close" node="button" className="red_button" onClick={() => deleteResidentSubmit(resident.id)}>
                                                    Confirmar
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                    className="delete"
                                />
                            </span>
                        </CollectionItem>
                    ))}
                    </Collection>
                </div>
            </div>
        </div>
    )
};

export default ResidentList;