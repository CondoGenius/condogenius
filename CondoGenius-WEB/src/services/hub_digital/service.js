
import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const HubDigitalService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getPublications =  () => {
        return axios.get(`${API_URL}/gateway/hub_digital/api/post`, 
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const getPublicationsByUserId =  (userId) => {
        return axios.get(`${API_URL}/gateway/hub_digital/api/post/user/${userId}`,
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const createPublication = (post) => {
        return axios.post(`${API_URL}/gateway/hub_digital/api/post`, post, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const createSurvey = (survey) => {
        return axios.post(`${API_URL}/gateway/hub_digital/api/poll`, survey, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const createComment = (comment) => {
        return axios.post(`${API_URL}/gateway/hub_digital/api/comment`, comment, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const fixPublication = (postId) => {
        return axios.put(`${API_URL}/gateway/hub_digital/api/pin/${postId}`, postId, {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const voteSurvey = (vote) => {
        return axios.post(`${API_URL}/gateway/hub_digital/api/vote`, vote, {
            headers: {
                ContentType: 'application/json',
                'x-access-token': token,
                'ngrok-skip-browser-warning': true
            },
        })
        .then(res => res)
        .catch(err => err);
    };
    

    const deletePublication = (id) => {
        return axios.delete(`${API_URL}/gateway/hub_digital/api/post/${id}`, 
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        }
        )
          .then(res => res)
          .catch(err => err);
    };

    const deleteComment = (id) => {
        return axios.delete(`${API_URL}/gateway/hub_digital/api/comment/${id}`, 
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        }
        )
          .then(res => res)
          .catch(err => err);
    };

    return {
        getPublications,
        getPublicationsByUserId,
        createPublication,
        createSurvey,
        createComment,
        fixPublication,
        voteSurvey,
        deletePublication,
        deleteComment
    };

};

export default HubDigitalService;