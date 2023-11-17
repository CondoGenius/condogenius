import axios from 'axios';

const UserService = () => {

    const authUserLogin = (authLogin) => {
        return axios.post(`http://localhost:5000/gateway/login`, JSON.stringify(authLogin), {
            headers: {
                'Content-Type': 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const createUser = (user) => {
        return axios.post(`http://localhost:5000/gateway/user/register`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const resetPassword = (updatePassword) => {
        return axios.put(`http://localhost:5000/gateway/user/reset-password`, updatePassword, {
            headers: {
                'Content-Type': 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    return {
        authUserLogin,
        createUser,
        resetPassword
    };

};

export default UserService;
