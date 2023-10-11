import { useState } from 'react';
import ResidenceService from '../../../services/residences/service';
import { useDispatch } from "react-redux";

import { setResidences } from "../../../store/residences/actions";

const useResidences = () => {
    const dispatch = useDispatch();
    const [loadingResidences, setLoadingResidences] = useState(false);

    const getAllResidences = async () => {
        setLoadingResidences(true)

        const response = await ResidenceService().getAllResidences();
        setLoadingResidences(false)

        if (response?.status === 200) {
            dispatch(setResidences({ list: response.data }));
        } else {
            dispatch(setResidences({ error: "Erro ao listar residencias." }));
        }
        
    };
    

    return [
        loadingResidences,
        getAllResidences
    ];

};

export default useResidences;