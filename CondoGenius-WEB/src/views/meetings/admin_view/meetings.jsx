import { useEffect } from 'react';
import { MdAddBox, MdRemoveCircleOutline } from 'react-icons/md';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from "../../../components/loading/loading";
import ModalContent from '../../../components/modal/modal_content';
import useMeetings from "../../../states/meetings/hooks/useMeetings";
import { FormatDate } from '../../../utils/utils';
import MeetingsForm from './containers/form/meetings_form';


const MeetingsAdminView = () => {
    const meetings = useSelector((state) => state.meetings);

    const { loadingMeetings, getMeetings, createMeeting, deleteMeeting } = useMeetings();

    useEffect(() => {
        getMeetings();
    }, []);

    useEffect(() => {
        toast.error(meetings.error)
    }, [meetings.error]);

    const submitDeleteMeeting = async (e, meetingId) => {
        e.preventDefault();
        const response = await deleteMeeting(meetingId);

        if (response === 200) {
            toast.success("Reunião cancelada com sucesso");
            getMeetings();
        };
    }
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
            <div className="button_register_content">
                <ModalContent
                    header={`Nova reclamação`}
                    trigger={<Button><MdAddBox />Cadastar nova reunião</Button>}
                    children={<MeetingsForm />}
                    className="complaint"
                />
            </div>
            <div className='list_view'>
                <Collection>
                <CollectionItem key="header" className='list_header'>
                    <span>Tema</span>
                    <span>Descrição</span>
                    <span>Data</span>
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
                            <span>
                                <MdRemoveCircleOutline onClick={(e) => submitDeleteMeeting(e, meeting.id)}/>
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

export default MeetingsAdminView;