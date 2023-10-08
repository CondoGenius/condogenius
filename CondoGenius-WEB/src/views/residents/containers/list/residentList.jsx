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
import useResidences from "../../../../states/residences/hooks/useResidences";

const ResidentList = () => {
    const residences = useSelector(state => state.residences.list);
    const residents = useSelector((state) => state.residents);

    const [ loadingResidents, getAllResidents, , , deleteResident] = useResidents();
    const [ , getAllResidences ] = useResidences();


    useEffect(() => {
        getAllResidents();
        getAllResidences();
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
                            {`${resident.name} ${resident.last_name}`}
                            </span>
                            <span>
                            Residência {residences.find((residence) => residence.id === resident.residence_id)?.number}
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