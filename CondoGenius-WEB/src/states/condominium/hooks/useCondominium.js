import { useState } from 'react';
import { useDispatch } from "react-redux";
import CondominiumService from '../../../services/condominium/service';

import { setCondominiumAction } from '../../../store/condominium/actions';

const useCondominium = () => {
    const dispatch = useDispatch();
    const [loadingCondominium, setLoadingCondominium] = useState(false);

    const getInfoCondominiumByUserId = async (userId) => {
        setLoadingCondominium(true)

        const response = await CondominiumService().getInfoCondominiumByUserId(userId);
        setLoadingCondominium(false)

        if (response?.status === 200) {
            dispatch(setCondominiumAction({ data: response.data }));
        } else {
            dispatch(setCondominiumAction({ error: "Erro ao listar entregas." }));
        }
    };
    

    return {
        loadingCondominium,
        getInfoCondominiumByUserId
    };
};

export default useCondominium;