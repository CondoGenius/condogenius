import LoginService from "../../../services/login/service";
import { useDispatch } from "react-redux";

import { setUserAction } from "../../../store/user/actions";

const useLogin = () => {
    const dispatch = useDispatch();

    const authUserLogin = async (email, password) => {

        const response = await LoginService().authUserLogin({User: "Admin", Password: "admin123"});

        if (response.status === 200) {
            dispatch(setUserAction({
                id: 1,
                email: response.data.user,
                token: response.data.jwtToken,
                role: 'resident',
                isLogged: true
            }))
            localStorage.setItem("user", JSON.stringify({email: response.data.user, token: response.data.jwtToken, role: 'resident', isLogged: true}));
        };
        
        return response;
    };

    return {
        authUserLogin
    }
};

export default useLogin;