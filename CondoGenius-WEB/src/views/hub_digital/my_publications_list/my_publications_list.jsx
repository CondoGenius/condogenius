import FormPublication from "../form_publication/form_publication";


import React, { useEffect } from "react";
import { MdArrowForward } from 'react-icons/md';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import Loading from "../../../components/loading/loading";
import useHubDigital from "../../../states/hub_diigtal/hooks/useHubDigital";
import CardPublication from "../card_publication/card_publication";

import '../hub_digital.scss';

const MyPublications = () => {
    const hubDigital = useSelector((state) => state.hubDigital);
    const user = useSelector((state) => state.user.data);
    const myPublications = useSelector((state) => state.hubDigital.myPublications);

    const { loadingHubDigital, getPublicationsByUserId } = useHubDigital();

    useEffect(() => {
        toast.error(hubDigital.error)
    }, [hubDigital.error]);

    useEffect(() => {
        getPublicationsByUserId(user.id);
    }, []);

    return (
        <div>
            <Loading
                show={
                    loadingHubDigital
                }
            />
            <div className='header_content'>
                <h1>Hub Digital</h1>
            </div>
            <div className='content_my_publications'>
                <NavLink to='/my-publications'>
                    Minhas publicações <MdArrowForward />
                </NavLink>
            </div>
            <FormPublication />
            {myPublications?.length > 0 ? (
                myPublications.map(publication => (
                    <CardPublication publication={publication} />
                ))
            ) : (
                <span className="message_not_result">Nenhuma publicação para exibir</span>
            )}
        </div>
    )
};

export default MyPublications;