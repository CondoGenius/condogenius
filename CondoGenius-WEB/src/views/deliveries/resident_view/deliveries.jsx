import { useEffect } from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import Loading from '../../../components/loading/loading';

import useDeliveries from '../../../states/deliveries/hooks/useDeliveries';

import { FormatDateZone } from '../../../utils/utils';

const DeliveriesResidentView = () => {
    const resident = useSelector((state) => state.resident.data);
    const deliveries = useSelector((state) => state.resident.deliveries);

    const { loadingDeliveries, getDeliveriesByResidenceId } = useDeliveries();
    
    useEffect(() => {
        getDeliveriesByResidenceId(resident.residenceId);
    }, []);
    
    return (
        <div> 
            <Loading
                show={
                    loadingDeliveries
                }
            />
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
                            {delivery.admin_name ?? '-'}
                            </span>
                            <span>
                            {delivery.received_at ? FormatDateZone(delivery.received_at) : '-'}
                            </span>
                            <span>
                            {delivery.delivered_at ? FormatDateZone(delivery.delivered_at) : '-'}
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

export default DeliveriesResidentView;