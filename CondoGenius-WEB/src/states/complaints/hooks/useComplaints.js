import { useState } from 'react';
import { useDispatch } from "react-redux";

import ComplaintsService from '../../../services/complaints/service';

import { setComplaintsAction } from '../../../store/complaints/actions';
import { setResidentComplaintsAction } from '../../../store/resident/actions';

const useComplaints = () => {
    const dispatch = useDispatch();
    const [loadingComplaints, setLoadingComplaints] = useState(false);

    const getComplaintsByResindentId = async (residentId) => {
        setLoadingComplaints(true);

        const response = await ComplaintsService().getComplaintsByResindentId(residentId);

        if (response?.status === 200) {
            dispatch(setResidentComplaintsAction({ complaints: response.data }));
        } else {
            dispatch(setResidentComplaintsAction({ error: "Erro ao listar suas reclamações."}));
        }

        setLoadingComplaints(false);
        return response;
    };

    const getComplaints = async () => {
        setLoadingComplaints(true);

        const response = await ComplaintsService().getComplaints();
        
        if (response?.status === 200) {
            dispatch(setComplaintsAction({ list: response.data }));
        } else {
            dispatch(setComplaintsAction({ error: "Erro ao listar reclamações." }));
        }
        
        setLoadingComplaints(false);
    };

    const createComplaint = async (values) => {
        setLoadingComplaints(true);
        
        const complaint = {
            residence_id: values.residenceId,
            resident_id: values.residentId,
            description: values.description,
            status: 'analysis'
        };

        const response = await ComplaintsService().createComplaint(complaint);

        if (response?.status !== 201) {
            dispatch(setComplaintsAction({ error: "Erro ao cadastrar reclamação." }));
        }

        setLoadingComplaints(false);
        return response;
    };

    const updateComplaint = async (values) => {
        setLoadingComplaints(false);

        const complaint = {
            id: values.id,
            status: values.status
        };

        const response = await ComplaintsService().updateComplaint(complaint);

        if (response?.status !== 200) {
            dispatch(setComplaintsAction({ error: "Erro ao atualiazar situação da reclamação." }));
        }

        setLoadingComplaints(false);
        return response;
    };

    return {
        loadingComplaints,
        getComplaintsByResindentId,
        getComplaints,
        createComplaint,
        updateComplaint
    };

};

export default useComplaints;