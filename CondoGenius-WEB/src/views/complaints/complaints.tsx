import React from "react";

import ComplaintsResident from './resident_view/complaints';
import ComplaintsUser from "./user_view/complaints";

const Complaints = () => {
    // if user is resident
    return (
        <ComplaintsResident />
    )
};

export default Complaints;