import React from 'react';
import ModalContent from "../../../components/modal/modal_content";
import { Collection, CollectionItem, Button } from 'react-materialize';

import { listComplaints } from '../../../states/complaints/mock';
import { MdAddCircle } from 'react-icons/md';
import { MdCheckBox } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import { MdInfo } from 'react-icons/md';

import './complaints.scss';

const renderFormComplaint = () => (
  <>
    <br/>
    <textarea name="complaint" placeholder='Descreva em detalhes o motivo da sua reclamação incluindo o nome ou casa do morador reclamado' className='complaint_field'></textarea>
    <div className='complaint_button'>
        <Button>Enviar reclamação</Button>
    </div>
  </>
);

const ComplaintsResident = () => {
  return (
    <>
        <div className="header_content">
          <h1>Reclamações</h1>
        </div>
        <div className='form_complaint'>
          <ModalContent
            header={`Nova reclamação`}
            trigger={<Button>Enviar nova reclamação</Button>}
            children={renderFormComplaint()}
            className="complaint"
          />
        </div>
        <div>
          <div className='list_view'>
            <Collection>
            <CollectionItem key="header" className='list_header'>
                <span className='complaint_list_body'>Reclamação</span>
                <span>Status</span>
                <span />
            </CollectionItem>
            {listComplaints.map(complaint => (
                <CollectionItem key={complaint.id}>
                    <span className='complaint_list_text'>
                    {complaint.text}
                    </span>
                    <span className='complaint_list_status'>
                        {complaint.status === 'notified' && <MdCheckBox className='complaint_status_notified'/>}
                        {complaint.status === 'analysis' && <MdInfo className='complaint_status_analysis'/>}
                        {complaint.status === 'disapproved' && <MdCancel className='complaint_status_disapproved'/>}
                    </span>
                    <span>
                        <ModalContent
                            header={`Detalhes da reclamção`}
                            trigger={<MdAddCircle />}
                            children={
                            <>
                                {complaint.text}
                                <p>Data: {complaint.date}</p>
                            </>
                            }
                            className="complaint"
                        />
                    </span>
                </CollectionItem>
            ))}
            </Collection>
          </div>
        </div>
    </>
  );
};

export default ComplaintsResident;