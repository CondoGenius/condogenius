import UserService from "../../../services/user/service";
import { useDispatch } from "react-redux";

import { setUserAction } from "../../../store/user/actions";

const useUser = () => {
    const dispatch = useDispatch();

    const authUserLogin = async (email, password) => {

        const response = await UserService().authUserLogin({User: email, Password: password});

        if (response?.status === 200) {
            dispatch(setUserAction({
                id: response.data.user.id,
                email: response.data.user.user,
                token: response.data.user.jwtToken,
                role: response.data.user.role,
                isLogged: true
            }));
            localStorage.setItem("user", JSON.stringify({id: response.data.user.id, email: response.data.user.user, token: response.data.user.jwtToken, role: response.data.user.role, isLogged: true}));
        };
        
        return response;
    };

    const createUser = async (email, password) => {
        const user = {
            email, password
        }

        const response = await UserService().createUser(user);
        
        return response
    }

    return {
        authUserLogin,
        createUser
    }
};

export default useUser;