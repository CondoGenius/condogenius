import React from 'react';
import { Collection, CollectionItem, Button } from 'react-materialize';
import ModalContent from "../../../components/modal/modal_content";

import { listComplaints } from '../../../states/complaints/mock';
import { MdAddCircle } from 'react-icons/md';
import { MdCheckBox } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import { MdInfo } from 'react-icons/md';

import './complaints.scss';

const renderComplaintMoreInfo = (complaint) => (
    <>
        {complaint.text}
        <p>Data: {complaint.date}</p>
        <div className='complaint_actions_buttons'>
            <Button className='green_button'>
                Marcar denúncia como notificada
            </Button>
            <Button className='red_button'>
                Marcar denúncia como reprovada
            </Button>
        </div>
    </>
);

const ComplaintsUser = () => {
    return (
        <>
        <div className='header_content'>
            <h1>Reclamações</h1>    
        </div>
        <div className='list_view'>
            <Collection>
            <CollectionItem key="header" className='list_header'>
                <span>Nome</span>
                <span className='complaint_list_body'>Reclamação</span>
                <span>Data</span>
                <span>Status</span>
                <span />
            </CollectionItem>
            {listComplaints.map(complaint => (
                <CollectionItem key={complaint.id}>
                    <span>
                    {complaint.name}
                    </span>
                    <span className='complaint_list_text'>
                    {complaint.text}
                    </span>
                    <span>
                    {complaint.date}
                    </span>
                    <span className='complaint_list_status'>
                        {complaint.status === 'notified' && <MdCheckBox className='complaint_status_notified'/>}
                        {complaint.status === 'analysis' && <MdInfo className='complaint_status_analysis'/>}
                        {complaint.status === 'disapproved' && <MdCancel className='complaint_status_disapproved'/>}
                    </span>
                    <span>
                        <ModalContent
                            header={`Reclamação de ${complaint.name}`}
                            trigger={<MdAddCircle />}
                            children={renderComplaintMoreInfo(complaint)}
                            className="complaint"
                        />
                    </span>
                </CollectionItem>
            ))}
            </Collection>
      </div>
        </>
    );
};

export default ComplaintsUser;