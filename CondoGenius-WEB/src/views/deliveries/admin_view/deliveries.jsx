import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import DeliveriesActions from "./containers/actions/deliveries_actions";
import DelivriesList from "./containers/list/deliveries_list";
import useDeliveries from "../../../states/deliveries/hooks/useDeliveries";

import Loading from "../../../components/loading/loading";
import { toast } from 'react-toastify';


const Deliveries = () => {
    const deliveries = useSelector((state) => state.deliveries);
    const [ loadingDeliveries, , , , ] = useDeliveries();

    useEffect(() => {
        toast.error(deliveries.error)
      }, [deliveries.error]);

    return (
        <div className='content_residents'>
             <Loading
                show={
                    loadingDeliveries
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

export default Deliveries;