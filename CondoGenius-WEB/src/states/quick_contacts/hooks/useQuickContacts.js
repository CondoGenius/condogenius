import { useState } from 'react';
import { useDispatch } from "react-redux";
import QuickContactsService from '../../../services/quick_contacts/service';

import { setQuickContactsAction } from '../../../store/quick_contacts/actions';

const useQuickContacts = () => {
    const dispatch = useDispatch();
    const [loadingQuickContacts, setLoadingQuickContacts] = useState(false);

    const getQuickContacts = async (filters) => {
        setLoadingQuickContacts(true);

        const response = await QuickContactsService().getQuickContacts(filters);

        if (response?.status === 200) {
            dispatch(setQuickContactsAction({ list: response.data }));
        } else {
            dispatch(setQuickContactsAction({ error: "Erro ao listar contatos rápidos"}));
        }

        setLoadingQuickContacts(false);
        return response;
    };

    const createQuickContact = async (values) => {
        setLoadingQuickContacts(true);

        const contact = {
            type: values.type,
            name: values.name,
            contact: values.contact
        };

        const response = await QuickContactsService().createQuickContact(contact);

        if (response?.status !== 201) {
            dispatch(setQuickContactsAction({ error: "Erro ao cadastrar contato." }));
        }

        setLoadingQuickContacts(false);
        return response;
    };

    const deleteQuickContact = async (id) => {
        setLoadingQuickContacts(false);

        const response = await QuickContactsService().deleteQuickContact(id);

        if (response?.status !== 200) {
            dispatch(setQuickContactsAction({ error: "Erro ao deletar contato."}));
        }
        
        setLoadingQuickContacts(false);
        return response;
    };
    
    return {
        loadingQuickContacts,
        getQuickContacts,
        createQuickContact,
        deleteQuickContact
    };

};

export default useQuickContacts;