import React from "react";
import { publications } from "../../states/hub/mock";
import CardPublication from "./card_publication/card_publication";
import FormPublication from "./form_publication/form_publication";

import './hub.scss';

const HubDigital = () => {

    return (
        <div>
            <div className='header_content'>
                <h1>Hub Digital</h1>
            </div>
            <FormPublication />
            <div className="hub_list_view">
                {publications?.map(publication => (
                    <CardPublication publication={publication} />
                ))}
            </div>
        </div>
    )
};

export default HubDigital;