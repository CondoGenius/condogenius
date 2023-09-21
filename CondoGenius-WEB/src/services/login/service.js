import axios from 'axios';

const LoginService = () => {

    const authUserLogin = (authLogin) => {
        return axios.post(`http://localhost:5233/api/auth/login`, JSON.stringify(authLogin), {
            headers: {
                'Content-Type': 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    return {
        authUserLogin
    };

};

export default LoginService;
