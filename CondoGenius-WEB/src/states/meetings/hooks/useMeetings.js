import { useState } from 'react';
import { useDispatch } from "react-redux";
import MeetingsService from '../../../services/meetings/service';

import { setMeetingsAction } from '../../../store/meetings/actions';

const useMeetings = () => {
    const dispatch = useDispatch();
    const [loadingMeetings, setLoadingMeetings] = useState(false);

    const getMeetings = async () => {
        setLoadingMeetings(true);

        const response = await MeetingsService().getMeetings();

        if (response?.status === 200) {
            dispatch(setMeetingsAction({ list: response.data }));
        } else {
            dispatch(setMeetingsAction({ error: "Erro ao listar reuniões"}));
        }

        setLoadingMeetings(false);
        return response;
    };

    const createMeeting = async (values) => {
        setLoadingMeetings(true);

        const meeting = {
            user_id: values.userId,
            tittle: values.tittle,
            description: values.description,
            date: values.date,
            hour: values.hours
        };

        const response = await MeetingsService().createMeeting(meeting);

        if (response?.status !== 201) {
            dispatch(setMeetingsAction({ error: "Erro ao cadastrar reunião." }));
        }

        setLoadingMeetings(false);
        return response;
    };

    const deleteMeeting = async (id) => {
        setLoadingMeetings(false);

        const response = await MeetingsService().deleteMeeting(id);

        if (response?.status !== 200) {
            dispatch(setMeetingsAction({ error: "Erro ao deletar morador." }));
        }
        
        setLoadingMeetings(false);
        return response;
    };
    

    return {
        loadingMeetings,
        getMeetings,
        createMeeting,
        deleteMeeting
    };

};

export default useMeetings;