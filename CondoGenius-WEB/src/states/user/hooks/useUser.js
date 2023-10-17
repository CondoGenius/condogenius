import { useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "../../../services/user/service";

import { setUserAction } from "../../../store/user/actions";

const useUser = () => {
    const [loadingUser, setLoadingUser] = useState(false);
    const dispatch = useDispatch();

    const authUserLogin = async (email, password) => {
        setLoadingUser(true);
        const response = await UserService().authUserLogin({email, password});

        if (response?.status === 200) {
            dispatch(setUserAction({
                id: response.data.id,
                email: response.data.user,
                token: response.data.jwtToken,
                role: response.data.role,
                isLogged: response.data.id ? true : false
            }));
            localStorage.setItem("user", JSON.stringify({id: response.data.id, email: response.data.user, token: response.data.jwtToken, role: response.data.role, isLogged: response.data.id ? true : false}));
        };

        setLoadingUser(false);
        return response;
    };

    const createUser = async (email, password) => {
        setLoadingUser(true);

        const user = {
            email, password, role_id: 1
        }

        const response = await UserService().createUser(user);

        setLoadingUser(false);
        return response
    }

    return {
        loadingUser,
        authUserLogin,
        createUser
    }
};

export default useUser;