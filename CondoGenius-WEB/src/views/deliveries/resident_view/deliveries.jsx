import { useEffect } from 'react';
import { Collection, CollectionItem, Button } from 'react-materialize';
import { useSelector } from 'react-redux';

import useDeliveries from '../../../states/deliveries/hooks/useDeliveries';

import { FormatDate } from '../../../utils/utils';

const Deliveries = () => {
    const resident = useSelector((state) => state.resident.data);
    const deliveries = useSelector((state) => state.resident.deliveries);

    const [ , getDeliveriesByResidenceId, , , , ] = useDeliveries();
    

    useEffect(() => {
        getDeliveriesByResidenceId(resident.residenceId);
    }, []);
    
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
                {deliveries?.length > 0 ? (
                    deliveries?.map(delivery => (
                        <CollectionItem key={delivery.id}>
                            <span>
                            {delivery.user_name_received ? FormatDate(delivery.user_name_received) : '-'}
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

export default Deliveries;