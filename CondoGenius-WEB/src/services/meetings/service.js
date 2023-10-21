
import axios from 'axios';

const MeetingsService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getMeetings = () => {
        return axios.get(`http://localhost:5000/gateway/meetings/api/meetings`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };


    const createMeeting = (meeting) => {

        return axios.post(`http://localhost:5000/gateway/meetings/api/meetings`, meeting, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteMeeting = (id) => {
        return axios.delete(`http://localhost:5000/gateway/meetings/api/meetings/${id}`, 
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
        getMeetings,
        createMeeting,
        deleteMeeting
    };

};

export default MeetingsService;
