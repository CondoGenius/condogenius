import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { MdAddBox, MdClear } from 'react-icons/md';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../../../components/utils/errorField';
import useReservations from '../../../../../states/reservations/hooks/useReservations.js';
import { CpfMask } from '../../../../../utils/utils';
import './guest_form.scss';

const requiredFieldMessage = 'Este campo é obrigatório';
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const FormGuestListSchema = Yup.object().shape({
    name: Yup.string().required(requiredFieldMessage),
    cpf: Yup.string().required(requiredFieldMessage).matches(cpfRegex, 'CPF inválido')
});

const onSubmit = async (values, updateGuestList, getReservationsByResidentId, residentId, setIsSubmit) => {
    setIsSubmit();
    const response = await updateGuestList(values);

    if (response?.status === 201) {
        document.getElementById('reset_form_guest').click();
        toast.success("Convidado adicionado com sucesso.");
        getReservationsByResidentId(residentId);
    }
};

const renderButtonSubmit = (isValid, handleSubmit, handleReset, setIsSubmit, values) => (
    <div>
        <Button 
        onClick={(e) => {
            setIsSubmit(true);
            if (isValid) {
                e.preventDefault();
                handleSubmit();
            }
        }}
        >
        <MdAddBox /> Adicionar
        </Button>
        <Button
        id="reset_form_guest"
        className="display_none"
        onClick={() => {
            handleReset();
        }}
        />
    </div>
);


const GuestForm = ({ guestList, reservationId }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const resident = useSelector((state) => state.resident);

    const { getReservationsByResidentId, updateGuestList, deleteFromGuestList } = useReservations();

    const removeGuest = async (e, id) => {
        e.preventDefault();
        const response = await deleteFromGuestList(id);

        if (response?.status === 200) {
            toast.success("Convidado removido.");
            getReservationsByResidentId(resident.data.id);
        }
    };

    useEffect(() => {
        toast.error(resident.error)
      }, [resident.error]);
    
    return (
        <Formik        
            initialValues={{
                reservationId: reservationId,
                name: '',
                cpf: '',
            }}
            validationSchema={FormGuestListSchema}
            onSubmit={values => {onSubmit(values, updateGuestList, getReservationsByResidentId, resident.data.id, setIsSubmit)}}
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
                            id="cpf"
                            type="text" 
                            placeholder="Digite o CPF do convidado"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={CpfMask(values.cpf)} 
                            maxLength={14}
                        />
                        {isSubmit && errors.cpf && <ErrorField error={errors.cpf}/>}
                    </div>
                    {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit, values)}
                </div>
                <Collection>
                {guestList?.length > 0 ? (
                        guestList.map(guest => (
                            <CollectionItem key={guest.id} className="guest_list_content">
                                <span>
                                {guest.name}
                                </span>
                                <span>
                                {CpfMask(guest.cpf)}
                                </span>
                                <span className='guest_list_info_remove'>
                                    <MdClear onClick={(e) => removeGuest(e, guest.id)}/>
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