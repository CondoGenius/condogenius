import { useState } from 'react';
import { useDispatch } from "react-redux";

import ResidenceService from '../../../services/residences/service';
import { setResidencesAction } from "../../../store/residences/actions";

const useResidences = () => {
    const dispatch = useDispatch();
    const [loadingResidences, setLoadingResidences] = useState(false);

    const getAllResidences = async () => {
        setLoadingResidences(true)

        const response = await ResidenceService().getAllResidences();
        setLoadingResidences(false)

        if (response?.status === 200) {
            dispatch(setResidencesAction({ list: response.data }));
        } else {
            dispatch(setResidencesAction({ error: "Erro ao listar residencias." }));
        }
        
    };
    

    return [
        loadingResidences,
        getAllResidences
    ];

};

export default useResidences;