import React, { useEffect } from 'react';
import { MdAddCircle, MdCancel, MdCheckBox, MdInfo } from 'react-icons/md';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/loading';
import ModalContent from "../../../components/modal/modal_content";
import Tooltip from '../../../components/tooltip/tooltip';
import useComplaints from '../../../states/complaints/hooks/useComplaints';
import { FormatDateZone } from "../../../utils/utils";
import ComplaintForm from './containers/form/complaint_form';

import './complaints.scss';

const ComplaintsResident = () => {
  const resident = useSelector((state) => state.resident);
  const { loadingComplaints, getComplaintsByResindentId } = useComplaints();

  useEffect(() => {
    getComplaintsByResindentId(resident.data.id);
  }, []);

  useEffect(() => {
    toast.error(resident.error);
  }, [resident.error]);

  return (
    <>
      <Loading show={ loadingComplaints } />
      <div className="header_content">
        <h1>Reclamações</h1>
      </div>
      <div className='form_complaint'>
        <ModalContent
          header={`Nova reclamação`}
          trigger={<Button>Enviar nova reclamação</Button>}
          children={ComplaintForm()}
          className="complaint"
        />
      </div>
      <div>
        <div className='list_view'>
          <Collection>
            <CollectionItem key="header" className='list_header'>
              <span className='complaint_list_body'>Reclamação</span>
              <span>Data</span>
              <span>Status</span>
              <span />
            </CollectionItem>
            {resident.complaints?.length > 0 ? (
              resident.complaints.map(complaint => (
                <CollectionItem key={complaint.id}>
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
                      header={`Detalhes da reclamção`}
                      trigger={<MdAddCircle />}
                      children={
                        <>
                          {complaint.description}
                          <p>Data: {FormatDateZone(complaint.date)}</p>
                        </>
                      }
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
      </div>
    </>
  );
};

export default ComplaintsResident;