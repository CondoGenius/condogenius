import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/loading';
import useQuickContacts from '../../../states/quick_contacts/hooks/useQuickContacts';
import QuickContactsActions from '../containers/actions/actions_quick_contacts';
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
            <h1>Lista de Contatos Rápidos</h1>
            </div>

           <QuickContactsActions filters={filters} setFilters={setFilters} />

           <QuickContactslist />
           
        </div>
    );
};

export default QuickContactsResidentView;