import { useState } from 'react';
import { useDispatch } from "react-redux";

import DeliveriesService from '../../../services/deliveries/service';
import { setDeliveriesAction } from '../../../store/deliveries/actions';
import { setResidentAction } from '../../../store/resident/actions';

const useDeliveries = () => {
    const dispatch = useDispatch();
    const [loadingDeliveries, setLoadingDeliveries] = useState(false);

    const getDeliveriesByResidenceId = async (residenceId) => {
        setLoadingDeliveries(true)
        
        const response = await DeliveriesService().getDeliveriesByResidenceId(residenceId);
        setLoadingDeliveries(false)

        if (response?.status === 200) {
            dispatch(setResidentAction({ deliveries: response.data }));
        } else {
            dispatch(setResidentAction({ error: "Erro ao listar suas entregas." }));
        }
    };

    const getDeliveries = async () => {
        setLoadingDeliveries(true)

        const response = await DeliveriesService().getDeliveries();
        setLoadingDeliveries(false)

        if (response?.status === 200) {
            dispatch(setDeliveriesAction({ list: response.data }));
        } else {
            dispatch(setDeliveriesAction({ error: "Erro ao listar entregas." }));
        }
    };

    const createDelivery = async (values) => {
        setLoadingDeliveries(true);

        const delivery = {
           residence_id: parseInt(values.residenceId),
           user_id: values.userId
        };

        const response = await DeliveriesService().createDelivery(delivery);

        if (response?.status !== 201) {
            dispatch(setDeliveriesAction({ error: "Erro ao cadastrar entrega." }));
        }

        setLoadingDeliveries(false);
        return response;
    };

    const updateDelivery = async (id) => {
        setLoadingDeliveries(false);

        const response = await DeliveriesService().updateDelivery(id);

        if (response?.status !== 200) {
            dispatch(setDeliveriesAction({ error: "Erro ao atualiazar entrega." }));
        }

        setLoadingDeliveries(false);
        return response;
    };
    

    return [
        loadingDeliveries,
        getDeliveriesByResidenceId,
        getDeliveries,
        createDelivery,
        updateDelivery
    ];
};

export default useDeliveries;