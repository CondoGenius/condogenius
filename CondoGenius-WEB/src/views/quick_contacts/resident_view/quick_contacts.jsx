import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from "../../../components/loading/loading";
import useQuickContacts from '../../../states/quick_contacts/hooks/useQuickContacts';
import { QuickContactsActionType } from '../../../store/quick_contacts/types';
import QuickContactslist from '../containers/list/list_quick_contacts';


const QuickContactsResidentView = () => {
    const quickContacts = useSelector((state) => state.quickContacts);

    const [filters, setFilters] = useState({
        type: '',
        name: ''
    });


    const { loadingQuickContacts, getQuickContacts } = useQuickContacts();

    useEffect(() => {
        getQuickContacts();
    }, []);

    useEffect(() => {
        toast.error(quickContacts.error)
    }, [quickContacts.error]);
    
    return (
        <div> 
            <Loading
                show={
                    loadingQuickContacts
                }
            />
            <div className='header_content'>
            <h1>Lista de Contatos rápidos</h1>
            </div>

           <QuickContactsActionType filters={filters} setFilters={setFilters} />

           <QuickContactslist />
           
        </div>
    );
};

export default QuickContactsResidentView;