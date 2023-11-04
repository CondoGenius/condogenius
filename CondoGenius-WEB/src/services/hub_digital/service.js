
import axios from 'axios';

const HubDigitalService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getPublications =  () => {
        return axios.get(`http://localhost:5000/gateway/hub_digital/api/post`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const getPublicationsByUserId =  (userId) => {
        return axios.get(`http://localhost:5000/gateway/hub_digital/api/post/user/${userId}`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const createPublication = (post) => {
        return axios.post(`http://localhost:5000/gateway/hub_digital/api/post`, post, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const createSurvey = (survey) => {
        return axios.post(`http://localhost:5000/gateway/hub_digital/api/poll`, survey, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const createComment = (comment) => {
        return axios.post(`http://localhost:5000/gateway/hub_digital/api/comment`, comment, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updatePublication = (postId) => {
        return axios.put(`http://localhost:5000/gateway/hub_digital/api/pin/${postId}`, {},
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const voteSurvey = (vote) => {
        return axios.post(`http://localhost:5000/gateway/hub_digital/api/vote`, vote, {
            headers: {
                'x-access-token': `${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deletePublication = (id) => {
        return axios.delete(`http://localhost:5000/gateway/hub_digital/api/post/${id}`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        }
        )
          .then(res => res)
          .catch(err => err);
    };

    const deleteComment = (id) => {
        return axios.delete(`http://localhost:5000/gateway/hub_digital/api/comment/${id}`, 
        {
            headers: {
                'x-access-token': `${token}`,
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
        updatePublication,
        voteSurvey,
        deletePublication,
        deleteComment
    };

};

export default HubDigitalService;