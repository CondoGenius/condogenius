import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import useHubDigital from '../../states/hub_diigtal/hooks/useHubDigital';
import CardPublication from "./card_publication/card_publication";
import FormPublication from "./form_publication/form_publication";

import './hub_digital.scss';

const HubDigital = () => {
    const hubDigital = useSelector((state) => state.hubDigital);
    const { loadingHubDigital } = useHubDigital();

    useEffect(() => {
        toast.error(hubDigital.error)
    }, [hubDigital.error])

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
            <FormPublication />
            {hubDigital?.publications?.length > 0 ? (
                hubDigital?.publications.map(publication => (
                    <CardPublication publication={publication} />
                ))
            ) : (
                <span className="message_not_result">Nenhuma publicação para exibir</span>
            )}
        </div>
    )
};

export default HubDigital;