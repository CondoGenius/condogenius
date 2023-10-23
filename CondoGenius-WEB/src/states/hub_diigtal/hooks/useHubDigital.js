import { useState } from 'react';
import { useDispatch } from "react-redux";
import HubDigitalService from '../../../services/hub_digital/service';
import { setPublicationsActions } from '../../../store/hub_digital/actions';

const useHubDigital = () => {
    const dispatch = useDispatch();
    const [loadingHubDigital, setLoadingHubDigital] = useState(false);

    const getPublications = async () => {
        setLoadingHubDigital(true);

        const response = await HubDigitalService().getPublications();
        
        if (response?.status === 200) {
            dispatch(setPublicationsActions({ publications: response.data }));
        } else {
            dispatch(setPublicationsActions({ error: "Erro ao listar publicações."}));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const getPublicationsByUserId = async (userId) => {
        setLoadingHubDigital(true);

        const response = await HubDigitalService().getPublicationsByUserId(userId);

        if (response?.status === 200) {
            dispatch(setPublicationsActions({ myPublications: response.data }));
        } else {
            dispatch(setPublicationsActions({ error: "Erro ao listar suas publicações."}));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const createPublication = async (values) => {
        setLoadingHubDigital(true);

        const post = {
            user_id: values.userId,
            type: values.type,
            description: values.description,
            options: values.options,
        };

        const response = await HubDigitalService().createPublication(post);

        if (response?.status !== 201) {
            dispatch(setPublicationsActions({ error: "Erro ao cadastrar publicação." }));
        }

        setLoadingHubDigital(false);
        return response;
    };

    const deletePublication = async (id) => {
        setLoadingHubDigital(false);

        const response = await HubDigitalService().deletePublication(id);

        if (response?.status !== 200) {
            dispatch(setPublicationsActions({ error: "Erro ao deletar publicação."}));
        }
        
        setLoadingHubDigital(false);
        return response;
    };
    

    return {
        loadingHubDigital,
        getPublications,
        getPublicationsByUserId,
        createPublication,
        deletePublication
    };

};

export default useHubDigital;