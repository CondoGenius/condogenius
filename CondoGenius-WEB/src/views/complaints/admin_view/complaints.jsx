import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { MdAddCircle, MdCancel, MdCheckBox, MdInfo } from 'react-icons/md';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/loading';
import ModalContent from "../../../components/modal/modal_content";
import Tooltip from "../../../components/tooltip/tooltip";
import useComplaints from '../../../states/complaints/hooks/useComplaints';
import useResidences from '../../../states/residences/hooks/useResidences';
import { FormatDateZone } from "../../../utils/utils";

import './complaints.scss';

const renderComplaintMoreInfo = (complaint, updateComplaint, getComplaints) => {
        
    const onSubmit = async (values) => {
        const response = await updateComplaint(values);

        if (response?.status === 200) {
            toast.success("Status da reclamação atualizada com sucesso.");
            getComplaints();
        }
    };
    
    return (
        <Formik        
            initialValues={{
                id: complaint.id,
                status: ''
            }}
            onSubmit={(values) => onSubmit(values)}
        > 
        {({
            values,
            setValues,
            handleSubmit
        }) => (
            <>
                {complaint.description}
                <p>Data: {FormatDateZone(complaint.date)}</p>
                <div className='modal_actions_button_content'>
                    <Button className='green_button' onClick={() => {setValues({...values, status: 'notified'}); handleSubmit()}} modal="close">
                        Marcar denúncia como notificada
                    </Button>
                    <Button className='red_button' onClick={() => {setValues({...values, status: 'disapproved'}); handleSubmit()}}  modal="close">
                        Marcar denúncia como reprovada
                    </Button>
                </div>
            </>
        )}
        </Formik>
    );
};

const ComplaintsAdminView = () => {
    const complaints = useSelector((state) => state.complaints);

    const { loadingResidences, getAllResidences } = useResidences();
    const { loadingComplaints, getComplaints, updateComplaint } = useComplaints();

    useEffect(() => {
        getComplaints();
        getAllResidences();
    }, []);

    useEffect(() => {
        toast.error(complaints.error)
    }, [complaints.error]);
    
    return (
        <div className='complaint_container'>
            <Loading 
                show={
                    loadingResidences ||
                    loadingComplaints
                }
            />
            <div className='header_content'>
                <h1>Reclamações</h1>    
            </div>
            <div className='list_view'>
                <Collection>
                <CollectionItem key="header" className='list_header'>
                    <span>Morador</span>
                    <span>Residência</span>
                    <span className='complaint_list_body'>Reclamação</span>
                    <span>Data</span>
                    <span>Status</span>
                    <span />
                </CollectionItem>
                {complaints.list?.length > 0 ? (
                    complaints.list.map(complaint => (
                        <CollectionItem key={complaint.id}> 
                            <span>
                            {`${complaint.resident_name} ${complaint.resident_last_name}`}
                            </span>
                            <span>
                            Residência {complaint.residence_number}
                            </span>
                            <span className='complaint_list_text'>
                            {complaint.description}
                            </span>
                            <span>
                            {FormatDateZone(complaint.date)}
                            </span>
                            <span className='complaint_list_status'>
                                {complaint.status === 'notified' && 
                                    <Tooltip message={"Notificada"}>
                                        <MdCheckBox className='complaint_status_notified'/>
                                    </Tooltip>
                                }
                                {complaint.status === 'analysis' && 
                                    <Tooltip message={"Em análise"}>
                                        <MdInfo className='complaint_status_analysis'/>
                                    </Tooltip>
                                }
                                {complaint.status === 'disapproved' && 
                                    <Tooltip message={"Reprovada"}>
                                        <MdCancel className='complaint_status_disapproved'/>
                                    </Tooltip>
                                }
                            </span>
                            <span>
                                <ModalContent
                                    header={`Reclamação de ${complaint.resident_name} ${complaint.resident_last_name}`}
                                    trigger={<MdAddCircle />}
                                    children={renderComplaintMoreInfo(complaint, updateComplaint, getComplaints)}
                                />
                            </span>
                        </CollectionItem>
                    ))
                ) : (
                    <span className="message_not_result">Nenhuma reclamação encontrada</span>
                )}
                </Collection>
            </div>
        </div>
    );
};

export default ComplaintsAdminView;