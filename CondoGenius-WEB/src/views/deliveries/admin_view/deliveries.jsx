import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Loading from "../../../components/loading/loading";
import useDeliveries from "../../../states/deliveries/hooks/useDeliveries";
import useResidences from "../../../states/residences/hooks/useResidences";
import DeliveriesActions from "./containers/actions/deliveries_actions";
import DelivriesList from "./containers/list/deliveries_list";

import './deliveries.scss';

const DeliveriesAdminView = () => {
    const deliveries = useSelector((state) => state.deliveries);

    const { loadingResidences } = useResidences();
    const { loadingDeliveries }= useDeliveries();

    useEffect(() => {
        toast.error(deliveries.error)
      }, [deliveries.error]);

    return (
        <div className='content_residents'>
            <Loading
                show={
                    loadingDeliveries ||
                    loadingResidences
                }
            />
            <div className='header_content'>
                <h1>Entregas</h1>
            </div>

            <DeliveriesActions />
            
            <DelivriesList />
        </div>
    );
};

export default DeliveriesAdminView;