import axios from 'axios';

const UserService = () => {

    const authUserLogin = (authLogin) => {
        return axios.post(`http://localhost:7008/api/auth/login`, JSON.stringify(authLogin), {
            headers: {
                'Content-Type': 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const createUser = (user) => {
        console.log(process.env)
        return axios.post(`http://localhost:7008/api/user`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    return {
        authUserLogin,
        createUser
    };

};

export default UserService;
