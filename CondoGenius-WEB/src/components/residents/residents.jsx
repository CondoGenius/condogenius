import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Button } from 'react-materialize';

import person from '../../assets/person.png';

import './residents.scss';
import 'materialize-css';

const Residents = () => (
  <div className='content_header'>
    <h1>Moradores <span className='subtitle'><AiOutlineArrowRight /> Cadastro de morador</span></h1>
    <div className='content_register_resident'>
      <div className='person_content'>
        <img src={person}/>
      </div>
      <div className='fields_content'>
        <div class="row">
          <form class="col s12">
            <div class="input-field col s6">
                  <input id="name" type="text" class="validate"/>
                  <label for="name">Nome*</label>
              </div>
              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate"/>
                <label for="last_name">Sobrenome*</label>
              </div>
          </form>
        </div>
        <div class="row">
          <form class="col s12">
              <div class="input-field col s6">
                <input id="cpf" type="text" class="validate"/>
                <label for="cpf">CPF*</label>
              </div>
              <div class="input-field col s6">
                <input id="last_name" type="date" class="validate"/>
                <label for="last_name">Data de nascimento*</label>
              </div>
          </form>
        </div>
        <div class="row">
          <form class="col s12">
              <div class="input-field col s6">
                <input id="cpf" type="text" class="validate"/>
                <label for="cpf">Contato*</label>
              </div>
              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate"/>
                <label for="last_name">E-mail*</label>
              </div>
          </form>
        </div>
        <div class="row">
          <form class="col s12">
            <div className='select_residence'>
              <div>
                <label>Selecione o número da residência do morador</label>
                <select class="browser-default">
                    <option value="" disabled selected hidden>Selecione</option>
                    <option value="1">Residência 23</option>
                    <option value="2">Residência 8</option>
                    <option value="3">Residência 4</option>
                </select>

              </div>
            </div>
          </form>
        </div>
        <div className='residents_button'>
          <Button onClick={() => {}}>Cadastrar morador</Button>
        </div>
      </div>
      
    </div>
  </div>
);

export default Residents;