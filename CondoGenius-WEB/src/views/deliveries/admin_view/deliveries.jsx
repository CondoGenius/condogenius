import React from "react";
import DeliveriesActions from "./containers/actions/deliveries_actions";
import DelivriesList from "./containers/list/deliveries_list";

const Deliveries = () => {
    return (
        <div className='content_residents'>
            <div className='header_content'>
                <h1>Entregas</h1>
            </div>

            <DeliveriesActions />
            
            <DelivriesList />
        </div>
    );
};

export default Deliveries;