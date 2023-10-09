import { useState } from 'react';
import ResidentsService from "../../../services/residents/service";
import { useDispatch } from "react-redux";

import { setResidents } from "../../../store/residents/actions";

const useResidents = () => {
    const dispatch = useDispatch();
    const [loadingResidents, setLoadingResidents] = useState(false);

    const getResidents = async (filters) => {
        setLoadingResidents(true)

        const response = await ResidentsService().getResidents(filters);
        setLoadingResidents(false)

        if (response?.status === 200) {
            dispatch(setResidents({ list: response.data }));
        } else {
            dispatch(setResidents({ error: "Erro ao listar moradores." }));
        }
        
    };

    const createResident = async (values) => {
        const resident = {
            name: values.name,
            last_name: values.lastName,
            cpf: values.cpf,
            email: values.email,
            birthday: values.birthday,
            contact: values.contact,
            residence_id: values.residenceId,
            is_active: 1,
        };

        const response = await ResidentsService().createResident(resident);
        
        return response;
    };

    const updateResident = async (values) => {
        const resident = {
            id: values.id,
            name: values.name,
            last_name: values.lastName,
            cpf: values.cpf,
            email: values.email,
            birthday: values.birthday,
            contact: values.contact,
            residence_id: values.residenceId,
        };

        const response = await ResidentsService().updateResident(resident);
        
        return response;
    };

    const deleteResident = async (id) => {

        const response = await ResidentsService().deleteResident(id);
        
        return response;
    };
    

    return [
        loadingResidents,
        getResidents,
        createResident,
        updateResident,
        deleteResident
    ];

};

export default useResidents;