
import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const MeetingsService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getMeetings = () => {
        return axios.get(`${API_URL}/gateway/meetings/api/meetings`, 
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


    const createMeeting = (meeting) => {

        return axios.post(`${API_URL}/gateway/meetings/api/meetings`, meeting, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteMeeting = (id) => {
        return axios.delete(`${API_URL}/gateway/meetings/api/meetings/${id}`, 
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
        getMeetings,
        createMeeting,
        deleteMeeting
    };

};

export default MeetingsService;
