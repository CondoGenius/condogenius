import React from 'react';
import { Button } from 'react-materialize';


import './complaints.scss';


const Complaints = () => (
  <div className='content_header'>
    <h1>Reclamações</h1>
    <br/>
    <textarea name="complaint" placeholder='Descreva em detalhes o motivo da sua reclamação incluindo o nome ou casa do morador reclamado' className='complaint_field'></textarea>
    <div className='complaint_button'>
        <Button>Enviar reclamação</Button>
    </div>
  </div>
);

export default Complaints;