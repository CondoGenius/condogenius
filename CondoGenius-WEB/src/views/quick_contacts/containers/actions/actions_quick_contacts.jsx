import { Formik } from 'formik';
import React from "react";
import { Button } from "react-materialize";

import { FiRefreshCcw } from 'react-icons/fi';
import { MdAddBox } from 'react-icons/md';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

import ModalContent from "../../../../components/modal/modal_content";
import Tooltip from "../../../../components/tooltip/tooltip";

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useQuickContacts from '../../../../states/quick_contacts/hooks/useQuickContacts';
import QuickContactsFormFields from '../../admin_view/containers/form/quick_contacts_form';


const onSubmit = (values, setFilters) => {
    setFilters({
        type: values.type !== '' ? values.type : null,
        name: values.name !== '' ? values.name : null,
    });
};

const clearFilters = (e, setFilters, handleReset) => {
    e.preventDefault();
    setFilters({type: '', name: ''});
    handleReset();
};

const renderFieldFilterByName = (handleChange, handleBlur, values) => (
    <input 
        id="name"
        type="text"
        placeholder="Digite o nome do contato"
        onChange={handleChange}
        value={values.name}
        handleBlur={handleBlur}
    />
);

const renderFieldFilterByType = (handleChange, handleBlur, values) => (
    <select
        className="browser-default"
        name="type"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.type}
    >
        <option value="mercados">Mercados</option>
        <option value="emergencia">Emergênciais</option>
        <option value="hospitais">Hospitais</option>
        <option value="gas">Gás</option>
        <option value="deliveries">Deliveries</option>
        <option value="outros">Outros</option>
    </select>
);

const renderButtonQuickContactRegister = () => (
    <ModalContent
        header="Cadastrar novo contato"
        trigger={<Button className='button_content_open_modal'><MdAddBox /> Cadastrar novo contato</Button>}
        children={<QuickContactsFormFields/>}
    />
);

const QuickContactsActions = ({filters, setFilters}) => {
    const user = useSelector((state) => state.user.data);
    const { getQuickContacts } = useQuickContacts();

    useEffect(() => {
        getQuickContacts(filters);
    }, [filters])

    return (
        <Formik        
            initialValues={{
                type: '',
                name: '',
            }}
            onSubmit={(values) => onSubmit(values, setFilters)}
        > 
            {({
                handleChange,
                handleBlur,
                values,
                handleSubmit,
                handleReset
            }) => (
                <div className="filter_content">
                    <div class="row">
                        <form class="col s12">
                            <div class="input-field col s3">
                                {renderFieldFilterByName(handleChange, handleBlur, values)}
                            </div>
                            <div class="input-field col s3">
                                {renderFieldFilterByType(handleChange, handleBlur, values)}
                            </div>
                            <div class="input-field col s05">
                                <Tooltip
                                    message={"Pesquisar"}
                                >
                                    <PiMagnifyingGlassBold className="magnifying_glass_icon" onClick={handleSubmit}/>
                                </Tooltip>
                            </div>
                            <div class="input-field col s05">
                                <Tooltip
                                    message={"Limpar filtros"}
                                >
                                    <FiRefreshCcw className="refresh_icon" onClick={(e) => clearFilters(e, setFilters, handleReset)} />
                                </Tooltip>
                            </div>
                            {user.isAdmin && 
                                <div class="input-field col s2 button_register_content">
                                    {renderButtonQuickContactRegister()}
                                </div>
                            }
                        </form>
                    </div>
                </div>
            )}
            </Formik>
    )
};

export default QuickContactsActions;