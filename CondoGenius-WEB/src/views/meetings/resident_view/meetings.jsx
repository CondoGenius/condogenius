import { useEffect } from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from "../../../components/loading/loading";
import useMeetings from '../../../states/meetings/hooks/useMeetings';
import { FormatDateZone } from '../../../utils/utils';

import '../meetings.scss';

const MeetingsResidentView = () => {
    const meetings = useSelector((state) => state.meetings);
    
    const { loadingMeetings, getMeetings } = useMeetings();

    useEffect(() => {
        getMeetings();
    }, []);

    useEffect(() => {
        toast.error(meetings.error)
    }, [meetings.error]);
    
    return (
        <div className='meetings_container'> 
            <Loading
                show={
                    loadingMeetings
                }
            />
            <div className='header_content'>
            <h1>Reuniões</h1>
            </div>
            <div className='list_view'>
                <Collection>
                <CollectionItem key="header" className='list_header'>
                    <span>Responsável</span>
                    <span className='meeting_list_title'>Tema</span>
                    <span className='meeting_list_description'>Descrição</span>
                    <span>Data</span>
                </CollectionItem>
                {meetings.list?.length > 0 ? (
                    meetings.list.map(meeting => (
                        <CollectionItem key={meeting.id}>
                            <span>
                            {`${meeting.admin_name} ${meeting.admin_last_name}`}
                            </span>
                            <span className='meeting_list_title'>
                            {meeting.title}
                            </span>
                            <span className='meeting_list_description'>
                            {meeting.description}
                            </span>
                            <span>
                            {FormatDateZone(meeting.date)} às {meeting.hour}
                            </span>
                        </CollectionItem>
                    ))
                ) : (
                    <span className="message_not_result">Nenhuma reunião encontrada</span>
                )}
                </Collection>
            </div>
        </div>
    );
};

export default MeetingsResidentView;