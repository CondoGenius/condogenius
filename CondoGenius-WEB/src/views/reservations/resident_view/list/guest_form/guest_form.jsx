import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Collection, CollectionItem, Button } from 'react-materialize';

import ErrorField from '../../../../../components/utils/errorField';

import { guestList } from '../../../../../states/reservations/mock';

import './guest_form.scss';

import { MdClear, MdAddBox } from 'react-icons/md';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormGuestListSchema = Yup.object().shape({
    name: Yup.string().ensure().required(requiredFieldMessage),
    document: Yup.string().ensure().required(requiredFieldMessage),
});

const onSubmit = async (values, area) => {
    
};

const GuestForm = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    
    return (
        <Formik        
            initialValues={{
                name: '',
                document: '',
            }}
            validationSchema={FormGuestListSchema}
            onSubmit={values => {onSubmit(values)}}
        > 
        {({
            handleChange,
            handleBlur,
            values,
            handleSubmit,
            handleReset,
            isValid,
            errors
        }) => (
            <div>
                <div className='guest_list_fields'>
                    <div>
                        <input 
                            id="name"
                            type="text" 
                            placeholder="Digite o nome do convidado"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {isSubmit && errors.name && <ErrorField error={errors.name}/>}
                    </div>
                    <div>
                        <input 
                            id="document"
                            type="text" 
                            placeholder="Digite o CPF/RG do convidado"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.document}
                        />
                        {isSubmit && errors.document && <ErrorField error={errors.document}/>}
                    </div>
                    <Button onClick={() => setIsSubmit(true)}><MdAddBox /> Adicionar</Button>
                </div>
                <Collection>
                    {guestList.map(guest => (
                        <CollectionItem key={guest.id}>
                            <span>
                            {guest.name}
                            </span>
                            <span className='guest_list_info'>
                            {guest.document}
                            </span>
                            <span>
                                <MdClear />
                            </span>
                    </CollectionItem>
                    ))}
                </Collection>
            </div>
        )}
        </Formik>
    );
};

export default GuestForm;