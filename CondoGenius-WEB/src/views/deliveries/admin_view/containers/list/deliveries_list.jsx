import React, { useEffect } from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Tooltip from "../../../../../components/tooltip/tooltip";
import useDeliveries from "../../../../../states/deliveries/hooks/useDeliveries";
import useResidences from "../../../../../states/residences/hooks/useResidences";
import { FormatDateZoneWithHour } from "../../../../../utils/utils";

const updateStatus = async (e, id, updateDelivery, getDeliveries) => {
    e.preventDefault();
    const response = await updateDelivery(id);

    if(response?.status === 200) {
        toast.success("Entrega atualizada com sucesso");
    }
    
    getDeliveries();
};

const DelivriesList = () => {
    const deliveries = useSelector((state) => state.deliveries.list);
    const residences = useSelector(state => state.residences.list);

    const {getDeliveries, updateDelivery } = useDeliveries();
    const { getAllResidences } = useResidences();

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
                            {delivery.received_at ? FormatDateZoneWithHour(delivery.received_at) : '-'}
                            </span>
                            <span>
                            {delivery.delivered_at ? FormatDateZoneWithHour(delivery.delivered_at) : '-'}
                            </span>
                            <span>
                            {delivery.status}
                            </span>
                            <span className="deliveried_status_content">
                            {delivery.status === 'Na portaria' ?
                            (<Button className="button_submit_delivered" onClick={(e) => updateStatus(e, delivery.id, updateDelivery, getDeliveries)}>Marcar como entregue</Button>) : (
                                <Tooltip message={"Entregue"}>
                                    <AiOutlineCheckCircle className="deliveried_icon"/>
                                </Tooltip>
                            )}
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