

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../../components/loading/loading";
import useHubDigital from "../../../states/hub_diigtal/hooks/useHubDigital";
import CardPublication from "../card_publication/card_publication";

import HeaderBackPage from "../../../components/header-back-page/header_back_page";
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
                <HeaderBackPage route="/hub"/>
                <h1>Minhas publicações</h1>
            </div>
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