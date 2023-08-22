import React from 'react';
import { Button } from 'react-materialize';


import './complaints.scss';


const Complaints = () => (
  <div className='content_header'>
    <h1>Reclamações</h1>
    <label>Selecione o morador a quem deseja dirigir a reclamação</label>
    <select class="browser-default">
        <option value="" disabled selected hidden>Selecione</option>
        <option value="1">José Henrique - Residência 23</option>
        <option value="2">Daniela Silva - Residência 8</option>
        <option value="3">Thiago Oliveira - Residência 4</option>
    </select>
    <br/>
    <textarea name="complaint" placeholder='Descreva em detalhes o motivo da sua reclamação incluindo o nome ou casa do morador reclamado' className='complaint_field'></textarea>
    <div className='complaint_button'>
        <Button>Enviar reclamação</Button>
    </div>
  </div>
);

export default Complaints;