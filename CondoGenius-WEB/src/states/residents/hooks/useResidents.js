import ResidentsService from "../../../services/residents/service";
import { useDispatch } from "react-redux";

import { setUserAction } from "../../../store/user/actions";

const useResidents = () => {
    const dispatch = useDispatch();

    const getAllResidents = async () => {

        const response = await ResidentsService().getAllResidents();

        if (response.status === 200) {
            dispatch(setUserAction({
                id: 1,
                email: response.data.user,
                token: response.data.jwtToken,
                role: 'resident',
                isLogged: true
            }))
        };
        
        return response;
    };

    return {
        getAllResidents
    }
};

export default useResidents;