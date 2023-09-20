import LoginService from "../../../services/login/service";

const useLogin = () => {

    const authUserLogin = async (email, password) => {

        const response = await LoginService().authUserLogin({User: "Admin", Password: "admin123"});
        console.log(response)
        return response;

    };

    return {
        authUserLogin
    }
};

export default useLogin;