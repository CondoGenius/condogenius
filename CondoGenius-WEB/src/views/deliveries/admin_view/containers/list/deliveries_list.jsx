import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Collection, CollectionItem } from 'react-materialize';

import { toast } from 'react-toastify';

import useDeliveries from "../../../../../states/deliveries/hooks/useDeliveries";
import useResidences from "../../../../../states/residences/hooks/useResidences";
import { FormatDate } from "../../../../../utils/utils";

const updateStatus = (e, id, updateDelivery) => {
    e.preventDefault();
    const response = updateDelivery(id);

    if(response?.status === 200) {
        toast.success("Status de entrega atualizado.");
    }
};

const DelivriesList = () => {
    const deliveries = useSelector((state) => state.deliveries.list);
    const residences = useSelector(state => state.residences.list);

    const [ , , getDeliveries, , updateDelivery] = useDeliveries();
    const [ , getAllResidences ] = useResidences();

    useEffect(() => {
        getDeliveries();
        getAllResidences();
    }, []);

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
                {deliveries?.length > 0 ? (
                    deliveries?.map(delivery => (
                        <CollectionItem key={delivery.id}>
                            <span>
                            Residência {residences.find((residence) => residence.id === delivery.residence_id)?.number}
                            </span>
                            <span>
                            {delivery.received ? FormatDate(delivery.received) : '-'}
                            </span>
                            <span>
                            {delivery.delivered ? FormatDate(delivery.delivered) : '-'}
                            </span>
                            <span>
                            {delivery.status}
                            </span>
                            <span>
                            <Button onClick={(e) => updateStatus(e, delivery.id, updateDelivery)}>Marcar como entregue</Button>
                            </span>
                        </CollectionItem>
                    ))
                ) : (
                    <span className="message_not_result">Nenhuma entrega encontrada</span>
                )}
                </Collection>
            </div>
        </div>
    );
};

export default DelivriesList;