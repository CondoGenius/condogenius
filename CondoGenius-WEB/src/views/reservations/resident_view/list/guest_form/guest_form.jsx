import { Formik } from 'formik';
import React, { useState } from 'react';
import { MdAddBox, MdClear } from 'react-icons/md';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../../../components/utils/errorField';
import useReservations from '../../../../../states/reservations/hooks/useReservations.js';
import './guest_form.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const FormGuestListSchema = Yup.object().shape({
    name: Yup.string().ensure().required(requiredFieldMessage),
    document: Yup.string().ensure().required(requiredFieldMessage),
});

const onSubmit = async (values, updateGuestList, getReservationsByUserId, userId) => {
    const response = await updateGuestList(values);

    if (response?.status === 200) {
        toast.success("Lista de convidados atualizada.");
        getReservationsByUserId(userId);
    }
};

const GuestForm = ({ guestList, reservationId }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const user = useSelector((state) => state.user.data)

    const { getReservationsByUserId, updateGuestList } = useReservations();
    
    return (
        <Formik        
            initialValues={{
                reservationId: reservationId,
                name: '',
                document: '',
            }}
            validationSchema={FormGuestListSchema}
            onSubmit={values => {onSubmit(values, updateGuestList, getReservationsByUserId, user.id)}}
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
                {guestList?.length > 0 ? (
                        guestList.map(guest => (
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
                        ))
                    ) : (
                        <span className="message_not_result">Nenhum convidado cadastado</span>
                    )}
                </Collection>
            </div>
        )}
        </Formik>
    );
};

export default GuestForm;