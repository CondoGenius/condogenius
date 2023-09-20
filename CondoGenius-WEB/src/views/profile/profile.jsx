import React from "react";

import './profile.scss';

import person from '../../assets/person.png';

const Profile = () => {

    return (
        <div>
            <div>
                <img src={person}/>
            </div>
            {/* <div>
            <Formik        
            initialValues={{
                name: residentEdited?.name ?? '',
                lastName: residentEdited?.lastName ?? '',
                cpf: residentEdited?.cpf ?? '',
                contact: residentEdited?.contact ?? '',
                birth: residentEdited?.birth ?? '',
                residenceNumber: residentEdited?.residenceNumber ?? ''
            }}
            validationSchema={FormResidentSchema}
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
                <div className='form_content'>
                    <div className='person_fields'>
                        <div className='fields'>
                            <div class="row">
                                <form class="col s12">
                                    <div class="input-field col s4">
                                        
                                    </div>
                                    <div class="input-field col s4">
                                        
                                    </div>
                                    <div class="input-field col s4">

                                    </div>
                                </form>
                            </div>
                            <div class="row">
                                <form class="col s12">
                                    <div class="input-field col s6">

                                    </div>
                                    <div class="input-field col s6">

                                    </div>
                                </form>
                            </div>
                            <div class="row">
                                <form class="col s12">
                                    <div class="input-field col s6">

                                    </div>
                                    <div class="input-field col s6">

                                    </div>
                                </form>
                            </div>
                            <div className='actions'>

                            </div>
                        </div>
                    </div>
            </div>
            )}
            </Formik>
            </div> */}
        </div>
    )
};

export default Profile;