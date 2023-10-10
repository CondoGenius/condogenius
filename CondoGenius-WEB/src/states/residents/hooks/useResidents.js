import { useState } from 'react';
import ResidentsService from "../../../services/residents/service";
import { useDispatch } from "react-redux";

import { setResident, setResidents } from "../../../store/residents/actions";

const useResidents = () => {
    const dispatch = useDispatch();
    const [loadingResidents, setLoadingResidents] = useState(false);

    const getResidentByCpf = async (cpf) => {
        setLoadingResidents(true);

        const response = await ResidentsService().getResidentByCpf(cpf);

        if (response?.status === 200) {
            dispatch(setResident({ data: response.data }));
        } else {
            dispatch(setResident({ error: "CPF não identificado na nossa base de dados. Procure um administrador"}));
        }

        setLoadingResidents(false);
        return response;
    };

    const getResidents = async (filters) => {
        setLoadingResidents(true);

        const response = await ResidentsService().getResidents(filters);
        
        if (response?.status === 200) {
            dispatch(setResidents({ list: response.data }));
        } else {
            dispatch(setResidents({ error: "Erro ao listar moradores." }));
        }
        
        setLoadingResidents(false);
    };

    const createResident = async (values) => {
        setLoadingResidents(true);

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

        if (response?.status !== 201) {
            dispatch(setResidents({ error: "Erro ao cadastrar morador." }));
        }

        setLoadingResidents(false);
        return response;
    };

    const updateResident = async (values) => {
        setLoadingResidents(false);

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

        if (response?.status !== 200) {
            dispatch(setResidents({ error: "Erro ao atualiazar morador." }));
        }

        setLoadingResidents(false);
        return response;
    };

    const deleteResident = async (id) => {
        setLoadingResidents(false);

        const response = await ResidentsService().deleteResident(id);

        if (response?.status !== 200) {
            dispatch(setResidents({ error: "Erro ao deletar morador." }));
        }
        
        setLoadingResidents(false);
        return response;
    };
    

    return [
        loadingResidents,
        getResidentByCpf,
        getResidents,
        createResident,
        updateResident,
        deleteResident
    ];

};

export default useResidents;