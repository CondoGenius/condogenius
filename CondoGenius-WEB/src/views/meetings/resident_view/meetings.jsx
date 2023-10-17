import { useEffect } from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from "../../../components/loading/loading";
import useMeetings from '../../../states/meetings/hooks/useMeetings';
import { FormatDate } from '../../../utils/utils';


const Meetings = () => {
    const meetings = useSelector((state) => state.meetings);

    const { loadingMeetings, getMeetings } = useMeetings();

    useEffect(() => {
        getMeetings();
    }, []);

    useEffect(() => {
        toast.error(meetings.error)
    }, [meetings.error]);
    
    return (
        <div> 
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
                    <span>Tema</span>
                    <span>Descrição</span>
                    <span>Data</span>
                    <span />
                </CollectionItem>
                {meetings.list?.length > 0 ? (
                    meetings.list.map(meeting => (
                        <CollectionItem key={meeting.id}>
                            <span>
                            {meeting.tittle}
                            </span>
                            <span>
                            {meeting.description}
                            </span>
                            <span>
                            {FormatDate(meeting.date)}
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

export default Meetings;