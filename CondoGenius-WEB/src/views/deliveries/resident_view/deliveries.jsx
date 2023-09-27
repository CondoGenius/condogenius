import react from "react";
import { Collection, CollectionItem } from 'react-materialize';

import { deliveries } from "../../../states/deliveries/mock";

const Deliveries = () => {
    return (
        <div> 
            <div className='header_content'>
            <h1>Entregas</h1>
            </div>
            <div className='list_view'>
                <Collection>
                <CollectionItem key="header" className='list_header'>
                    <span>Porteiro</span>
                    <span>Recebida</span>
                    <span>Entregue</span>
                    <span>Status</span>
                </CollectionItem>
                {deliveries.map(delivery => (
                    <CollectionItem key={delivery.id}>
                        <span>
                        {delivery.received_from}
                        </span>
                        <span>
                        {delivery.received}
                        </span>
                        <span>
                        {delivery.delivered}
                        </span>
                        <span>
                        {delivery.status}
                        </span>
                    
                    </CollectionItem>
                ))}
                </Collection>
            </div>
        </div>
    );
};

export default Deliveries;