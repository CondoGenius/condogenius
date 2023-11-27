import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const UserService = () => {

    const authUserLogin = (authLogin) => {
        return axios.post(`${API_URL}/gateway/login`, JSON.stringify(authLogin), {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const createUser = (user) => {
        return axios.post(`${API_URL}/gateway/user/register`, user, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const getTokenResetPassword = (email) => {
        return axios.post(`${API_URL}/gateway/user/token/reset-password`, email, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const verifyTokenResetPassword = (token) => {
        return axios.post(`${API_URL}/gateway/user/token/verify`, token, {
            headers: {
                'ngrok-skip-browser-warning': true
            },
        })
          .then(res => res)
          .catch(err => err);
    };

    const resetPassword = (updatePassword) => {
        return axios.post(`${API_URL}/gateway/user/reset-password`, updatePassword, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    return {
        authUserLogin,
        createUser,
        getTokenResetPassword,
        verifyTokenResetPassword,
        resetPassword
    };

};

export default UserService;
