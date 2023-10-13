import { useState } from 'react';
import { useDispatch } from "react-redux";
import ResidentsService from "../../../services/residents/service";

import { setResidentAction } from '../../../store/resident/actions';
import { setResidentsAction } from "../../../store/residents/actions";

const useResidents = () => {
    const dispatch = useDispatch();
    const [loadingResidents, setLoadingResidents] = useState(false);

    const getResidentByCpf = async (cpf) => {
        setLoadingResidents(true);

        const response = await ResidentsService().getResidentByCpf(cpf);

        if (response?.status === 200) {
            dispatch(setResidentAction({ data: response.data }));
        } else {
            dispatch(setResidentAction({ error: "CPF não identificado na nossa base de dados. Procure um administrador"}));
        }

        setLoadingResidents(false);
        return response;
    };

    const getResidentByUserId = async (userId) => {
        setLoadingResidents(true);
        const response = await ResidentsService().getResidentByUserId(userId);

        if (response?.status === 200) {
            dispatch(setResidentAction({data: {
                id: response.data.id, 
                userId: response.data.user_id,
                cpf: response.data.cpf,
                email: response.data.email,
                name: response.data.name,
                lastName: response.data.last_name,
                contact: response.data.contact,
                birthday: response.data.birthday,
                residenceId: response.data.residence_id
            }
            }));
            localStorage.setItem("resident", JSON.stringify({
                id: response.data.id, 
                userId: response.data.user_id,
                cpf: response.data.cpf,
                email: response.data.email,
                name: response.data.name,
                lastName: response.data.last_name,
                contact: response.data.contact,
                birthday: response.data.birthday,
                residenceId: response.data.residence_id
            }));
        } else {
            dispatch(setResidentAction({ error: "Morador não identificado na nossa base de dados. Procure um administrador"}));
        }

        setLoadingResidents(false);
        return response;
    };

    const getResidents = async (filters) => {
        setLoadingResidents(true);

        const response = await ResidentsService().getResidents(filters);
        
        if (response?.status === 200) {
            dispatch(setResidentsAction({ list: response.data }));
        } else {
            dispatch(setResidentsAction({ error: "Erro ao listar moradores." }));
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
            dispatch(setResidentsAction({ error: "Erro ao cadastrar morador." }));
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
            dispatch(setResidentsAction({ error: "Erro ao atualiazar morador." }));
        }

        setLoadingResidents(false);
        return response;
    };

    const deleteResident = async (id) => {
        setLoadingResidents(false);

        const response = await ResidentsService().deleteResident(id);

        if (response?.status !== 200) {
            dispatch(setResidentsAction({ error: "Erro ao deletar morador." }));
        }
        
        setLoadingResidents(false);
        return response;
    };
    

    return [
        loadingResidents,
        getResidentByCpf,
        getResidentByUserId,
        getResidents,
        createResident,
        updateResident,
        deleteResident
    ];

};

export default useResidents;