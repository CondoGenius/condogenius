import axios from 'axios';

const LoginService = () => {

    const authUserLogin = (authLogin) => {
        return axios.post(`http://localhost:5000/api/auth/login`, JSON.stringify(authLogin), {
            // headers: {
            //   Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            // },
          })
          .then(res => res)
          .catch(err => err);
    };

    return {
        authUserLogin
    };

};

export default LoginService;
