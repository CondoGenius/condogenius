import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ErrorField from '../../../../../components/utils/errorField';
import useComplaints from '../../../../../states/complaints/hooks/useComplaints';

const requiredFieldMessage = 'Este campo é obrigatório';

const FormComplaintSchema = Yup.object().shape({
  description: Yup.string().required(requiredFieldMessage)
});

const onSubmit = async (values, createComplaint, getComplaintsByResindentId, resident) => {
  const response = await createComplaint(values);

  if (response?.status === 201) {
    document.getElementById('reset_form_complaint').click();
    toast.success("Reclamação enviada com sucesso.");
    getComplaintsByResindentId(resident.id);
  }
}

const renderButtonSubmit = (isValid, handleSubmit, handleReset, setIsSubmit) => (
  <div>
    <Button 
      modal={isValid ? "close" : "open"}
      onClick={(e) => {
        setIsSubmit(true);
        if (isValid) {
            e.preventDefault();
            handleSubmit();
        }
      }}
    >
      Enviar reclamação
    </Button>
    <Button
      id="reset_form_complaint"
      className="display_none"
      onClick={() => {
        handleReset();
      }}
    />
  </div>
);

const ComplaintForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);

  const resident = useSelector((state) => state.resident.data);
  const { getComplaintsByResindentId, createComplaint } = useComplaints();

  return (
    <Formik
      initialValues={{
        residenceId: resident.residenceId,
        residentId: resident.id,
        description: '',
      }}
      validationSchema={FormComplaintSchema}
      onSubmit={values => onSubmit(values, createComplaint, getComplaintsByResindentId, resident)}
    >
    {({
      handleChange,
      handleBlur,
      values,
      handleSubmit,
      handleReset,
      isValid,
      errors,
      setValues
    }) => (
      <>
        <textarea 
          id="description"
          name="description"
          className="complaint_field"
          type="text" 
          placeholder='Descreva em detalhes o motivo da sua reclamação incluindo o nome ou casa do morador reclamado' 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
        />
        {isSubmit && errors.description && <ErrorField error={errors.description} />}

        <div className='complaint_button'>
          {renderButtonSubmit(isValid, handleSubmit, handleReset, setIsSubmit)}
        </div>
      </>
    )}
  </Formik>

  );
};

export default ComplaintForm;