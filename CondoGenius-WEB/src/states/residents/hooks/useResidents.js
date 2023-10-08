import { useState } from 'react';
import ResidentsService from "../../../services/residents/service";
import { useDispatch } from "react-redux";

import { setResidents } from "../../../store/residents/actions";

const useResidents = () => {
    const dispatch = useDispatch();
    const [loadingResidents, setLoadingResidents] = useState(false);

    const getAllResidents = async () => {
        setLoadingResidents(true)

        const response = await ResidentsService().getAllResidents();
        setLoadingResidents(false)

        if (response?.status === 200) {
            dispatch(setResidents({ list: response.data }));
        } else {
            dispatch(setResidents({ error: "Erro ao listar moradores." }));
        }
        
    };

    const createResident = async (values) => {
        const resident = {
            residence_id: "2",
            email: values.email,
            name: values.name,
            last_name: values.last_name,
            contact: values.contact
        };

        const response = await ResidentsService().createResident(resident);
        
        return response;
    };

    const updateResident = async (resident) => {

        const response = await ResidentsService().updateResident(resident);
        
        return response;
    };

    const deleteResident = async (id) => {

        const response = await ResidentsService().deleteResident(id);
        
        return response;
    };
    

    return [
        loadingResidents,
        getAllResidents,
        createResident,
        updateResident,
        deleteResident
    ];

};

export default useResidents;