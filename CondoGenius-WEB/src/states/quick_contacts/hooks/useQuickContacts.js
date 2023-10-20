import { useState } from 'react';
import { useDispatch } from "react-redux";
import QuickContactsService from '../../../services/quick_contacts/service';

import { quickContactsAction } from '../../../store/quick_contacts/actions';

const useQuickContacts = () => {
    const dispatch = useDispatch();
    const [loadingQuickContacts, setLoadingQuickContacts] = useState(false);

    const getQuickContacts = async () => {
        setLoadingQuickContacts(true);

        const response = await QuickContactsService().getQuickContacts();

        if (response?.status === 200) {
            dispatch(quickContactsAction({ list: response.data }));
        } else {
            dispatch(quickContactsAction({ error: "Erro ao listar contatos rápidos"}));
        }

        setLoadingQuickContacts(false);
        return response;
    };

    const getAllQuickContacts = async (filters) => {
        setLoadingQuickContacts(true);

        const response = await QuickContactsService().getAllQuickContacts(filters);

        if (response?.status === 200) {
            dispatch(quickContactsAction({ list: response.data }));
        } else {
            dispatch(quickContactsAction({ error: "Erro ao listar contatos rápidos"}));
        }

        setLoadingQuickContacts(false);
        return response;
    };

    const createQuickContact = async (values) => {
        setLoadingQuickContacts(true);

        const contact = {
            type: values.type,
            name: values.name,
            contact: values.name
        };

        const response = await QuickContactsService().createQuickContact(contact);

        if (response?.status !== 201) {
            dispatch(quickContactsAction({ error: "Erro ao cadastrar reserva." }));
        }

        setLoadingQuickContacts(false);
        return response;
    };
    
    return {
        loadingQuickContacts,
        getQuickContacts,
        getAllQuickContacts,
        createQuickContact
    };

};

export default useQuickContacts;