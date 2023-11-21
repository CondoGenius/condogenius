import { useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "../../../services/user/service";
import { setUserAction } from '../../../store/user/actions';

const useUser = () => {
    const [loadingUser, setLoadingUser] = useState(false);
    const dispatch = useDispatch();
    
    const authUserLogin = async (email, password) => {
        setLoadingUser(true);
        const response = await UserService().authUserLogin({email, password});

        if (response?.status === 200) {
            dispatch(setUserAction({data: {id: response.data.user_id, email: response.data.email, token: response.data.token, role: response.data.role, isLogged:  response.data.isLogged}}));
            localStorage.setItem("user", JSON.stringify({id: response.data.user_id, email: response.data.email, token: response.data.token, role: response.data.role, isLogged:  response.data.isLogged}));
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

    const getTokenResetPassword = async (email) => {
        setLoadingUser(true);

        const response = await UserService().getTokenResetPassword(email);

        setLoadingUser(false);
        return response
    };

    const verifyTokenResetPassword = async (token) => {
        setLoadingUser(true);

        const response = await UserService().verifyTokenResetPassword(token);

        setLoadingUser(false);
        return response
    };

    const resetPassword = async (values) => {
        setLoadingUser(true);

        const updatePassword = {
            email: values.email,
            new_password: values.password
        }

        const response = await UserService().resetPassword(updatePassword);

        setLoadingUser(false);
        return response
    }

    return {
        loadingUser,
        authUserLogin,
        createUser,
        getTokenResetPassword,
        verifyTokenResetPassword,
        resetPassword
    }
};

export default useUser;