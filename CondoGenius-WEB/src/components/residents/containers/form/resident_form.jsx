import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ErrorField from '../../../utils/errorField';
import HeaderBackPage from '../../../header-back-page/header_back_page';
import { Button } from 'react-materialize';

import person from '../../../../assets/person.png';

import './resident_form.scss';
import ResidentFormFields from './resident_form_fields';



const ResidentForm = () => {
    return (
        <div>
            <HeaderBackPage />
            <div className='content_resident_form'>
                <div className='person_content'>
                    <img src={person}/>
                </div>
                <div className='form_content'>
                    <div className='tittle'>
                        CADASTRAR MORADOR
                    </div>
                </div>

                
                <ResidentFormFields tittle="CADASTRAR MORADOR" />
            </div>
        </div>
    )
};

export default ResidentForm;