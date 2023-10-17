
import axios from 'axios';

const MeetingsService = () => {
    const token = localStorage.getItem('user')?.token;

    const getMeetings = () => {
        return axios.get(`http://localhost:7008/api/meetings`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };


    const createMeeting = (meeting) => {

        return axios.post(`http://localhost:7008/api/meetings`, meeting, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteMeeting = (id) => {
        return axios.delete(`http://localhost:7008/api/meetings/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
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
