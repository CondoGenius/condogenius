import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from "react-redux";
import { FormatDateZone } from "../../../utils/utils";

import { toast } from 'react-toastify';
import ModalContent from "../../../components/modal/modal_content";
import Tooltip from "../../../components/tooltip/tooltip";

import { MdAddCircle, MdCancel, MdCheckBox, MdInfo } from 'react-icons/md';

import useComplaints from '../../../states/complaints/hooks/useComplaints';
import useResidences from '../../../states/residences/hooks/useResidences';
import './complaints.scss';

const onSubmit = async(values, updateComplaint, getComplaints) => {
    const response = await updateComplaint(values);

    if (response?.status === 200) {
        getComplaints();
    }
};

const renderComplaintMoreInfo = ( complaint, updateComplaint) => (
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
            {complaint.text}
            <p>Data: {complaint.date}</p>
            <div className='complaint_actions_buttons'>
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

const ComplaintsUser = () => {
    const residences = useSelector((state) => state.residences.list);
    const complaints = useSelector((state) => state.complaints);

    const [ , getAllResidences ] = useResidences();
    const [, , getComplaints, , updateComplaint] = useComplaints();

    useEffect(() => {
        getComplaints();
        getAllResidences();
    }, []);

    useEffect(() => {
        toast.error(complaints.error)
      }, [complaints.error]);
    
    return (
        <>
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
                            {complaint.resident_name}
                            </span>
                            <span>
                            Residência {residences.find((residence) => residence.id === complaint.residence_id)?.number}
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
                                    header={`Reclamação de ${complaint.name}`}
                                    trigger={<MdAddCircle />}
                                    children={renderComplaintMoreInfo(complaint, updateComplaint, getComplaints)}
                                    className="complaint"
                                />
                            </span>
                        </CollectionItem>
                    ))
                ) : (
                    <span className="message_not_result">Nenhuma reclamação encontrada</span>
                )}
                </Collection>
            </div>
        </>
    );
};

export default ComplaintsUser;