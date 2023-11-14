import React, { useEffect } from "react";
import { MdEdit, MdRemoveCircleOutline } from 'react-icons/md';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import Loading from "../../../../components/loading/loading";
import ModalContent from "../../../../components/modal/modal_content";
import Tooltip from "../../../../components/tooltip/tooltip";
import useResidences from "../../../../states/residences/hooks/useResidences";
import useResidents from "../../../../states/residents/hooks/useResidents";
import { CpfMask } from "../../../../utils/utils";
import ResidentFormFields from "../form/resident_form";

const ResidentList = ({ filters }) => {
    const residences = useSelector(state => state.residences.list);
    const residents = useSelector((state) => state.residents.list);

    const { loadingResidents, getResidents, deleteResident } = useResidents();
    const { getAllResidences } = useResidences();

    useEffect(() => {
        getResidents();
        getAllResidences();
    }, []);

    useEffect(() => {
        getResidents(filters)
    }, [filters]);

    const deleteResidentSubmit = async (id) => {
        const response = await deleteResident(id);
        if(response.status === 200) {
            toast.success("Morador removido com sucesso.")
        }
        
        getResidents();
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
                    {residents?.length > 0 ? (
                        residents.map((resident) => (
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
                                {CpfMask(resident.cpf)}
                            </span>
                            <span className='icon'>
                                <Tooltip message={"Editar"}>
                                    <ModalContent 
                                    header="Editar morador"
                                    trigger={<MdEdit />}
                                    children={<ResidentFormFields residentEdited={resident}/>}
                                    className="update"
                                    />
                                </Tooltip>
                            </span>
                            <span className='icon'>
                            <Tooltip message={"Excluir"}>
                                <ModalContent 
                                    header="Excluir morador"
                                    trigger={<MdRemoveCircleOutline />}
                                    children={
                                        <div>
                                        <div>Tem certeza que deseja remover {resident.name} como morador do condomínio?</div>
                                        <div className="modal_actions_button_content">
                                            <Button modal="close" node="button" className="red_button" onClick={() => deleteResidentSubmit(resident.id)}>
                                            Confirmar
                                            </Button>
                                        </div>
                                        </div>
                                    }
                                />
                            </Tooltip>
                            </span>
                            </CollectionItem>
                        ))
                        ) : (
                            <span className="message_not_result">Nenhum morador encontrado</span>
                        )}
                    </Collection>
                </div>
            </div>
        </div>
    )
};

export default ResidentList;