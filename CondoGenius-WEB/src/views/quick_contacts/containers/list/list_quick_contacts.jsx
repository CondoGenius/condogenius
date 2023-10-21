import { useEffect } from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import useQuickContacts from '../../../../states/quick_contacts/hooks/useQuickContacts';
import { FormatPhone } from '../../../../utils/utils';


const QuickContactslist = () => {
    const quickContacts = useSelector((state) => state.quickContacts.list);

    const { getQuickContacts } = useQuickContacts();

    useEffect(() => {
        getQuickContacts();
    }, []);
    
    return (
        <div className='list_view'>
            <Collection>
            <CollectionItem key="header" className='list_header'>
                <span>Nome</span>
                <span>Telefone</span>
            </CollectionItem>
            {quickContacts?.length > 0 ? (
                quickContacts.map(contact => (
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
    );
};

export default QuickContactslist;