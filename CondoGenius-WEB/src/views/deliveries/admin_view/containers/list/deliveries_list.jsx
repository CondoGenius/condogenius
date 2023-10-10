import React from "react";
import { Button, Collection, CollectionItem } from 'react-materialize';

import { deliveries } from "../../../../../states/deliveries/mock";

const DelivriesList = () => {
    return (
        <div> 
            <div className='list_view'>
                <Collection>
                <CollectionItem key="header" className='list_header'>
                    <span>Residência</span>
                    <span>Recebida</span>
                    <span>Entregue</span>
                    <span>Status</span>
                    <span />
                </CollectionItem>
                {deliveries.map(delivery => (
                    <CollectionItem key={delivery.id}>
                        <span>
                        {delivery.residence}
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
                        <span>
                        <Button>Marcar como entregue</Button>
                        </span>
                    
                    </CollectionItem>
                ))}
                </Collection>
            </div>
        </div>
    );
};

export default DelivriesList;