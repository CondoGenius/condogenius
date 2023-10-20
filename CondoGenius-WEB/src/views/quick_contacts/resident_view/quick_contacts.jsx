import { useEffect } from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from "../../../components/loading/loading";
import useQuickContacts from '../../../states/quick_contacts/hooks/useMeetings';
import { FormatPhone } from '../../../utils/utils';


const QuickContactsResidentView = () => {
    const quickContacts = useSelector((state) => state.quickContacts);

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
            <div className='list_view'>
                <Collection>
                <CollectionItem key="header" className='list_header'>
                    <span>Nome</span>
                    <span>Telefone</span>
                </CollectionItem>
                {quickContacts.list?.length > 0 ? (
                    quickContacts.list.map(contact => (
                        <CollectionItem key={contact.id}>
                            <span>
                            {contact.name}
                            </span>
                            <span>
                            {FormatPhone(contact.phone)}
                            </span>
                        </CollectionItem>
                    ))
                ) : (
                    <span className="message_not_result">Nenhum contato cadastrado</span>
                )}
                </Collection>
            </div>
        </div>
    );
};

export default QuickContactsResidentView;