import { useEffect } from 'react';
import { FaRegCopy } from "react-icons/fa6";
import { MdRemoveCircleOutline } from 'react-icons/md';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ModalContent from '../../../../components/modal/modal_content';
import Tooltip from '../../../../components/tooltip/tooltip';
import useQuickContacts from '../../../../states/quick_contacts/hooks/useQuickContacts';
import { FormatPhone } from '../../../../utils/utils';
import './list_quick_contacts.scss';

const QuickContactslist = () => {
    const user = useSelector((state) => state.user.data);
    const quickContacts = useSelector((state) => state.quickContacts.list);

    const { getQuickContacts, deleteQuickContact } = useQuickContacts();

    const onSubmitDeleteQuickContact = async (id) => {
        const response = await deleteQuickContact(id);
        
        if(response.status === 200) {
            toast.success("Contato removido com sucesso.")
        }

        getQuickContacts();
    };

    const submitCopyPhone = (phone) => {
        navigator.clipboard.writeText(phone)
            .then(function() {
                toast.success("Contato copiado para área de trasnferência")
            })
            .catch(function(err) {
                toast.error('Erro ao copiar contato');
            });
    }

    useEffect(() => {
        getQuickContacts();
    }, []);
    
    return (
        <div className='list_view'>
            <Collection>
            <CollectionItem key="header" className='list_header'>
                <span>Nome</span>
                <span>Telefone</span>
                {user.isAdmin && <span />}
            </CollectionItem>
            {quickContacts?.length > 0 ? (
                quickContacts?.map(contact => (
                    <CollectionItem key={contact.id}>
                        <span>
                        {contact.name}
                        </span>
                        <span className='phone_content'>
                            {FormatPhone(contact.contact)} 
                            <Tooltip message="Copiar contato">
                                <FaRegCopy onClick={() => submitCopyPhone(FormatPhone(contact.contact))}/>
                            </Tooltip>
                        </span>
                        {user.isAdmin &&
                            <span>
                                <Tooltip message={"Excluir"}>
                                    <ModalContent 
                                        header="Excluir contato"
                                        trigger={<MdRemoveCircleOutline />}
                                        children={
                                        <div>
                                            <div>Tem certeza que deseja remover o contato de {contact.name}?</div>
                                            <div className="modal_actions_button_content">
                                                <Button modal="close" node="button" className="red_button" onClick={() => onSubmitDeleteQuickContact(contact.id)}>
                                                Confirmar
                                                </Button>
                                            </div>
                                        </div>
                                        }
                                    />
                                </Tooltip>
                            </span>
                        }
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