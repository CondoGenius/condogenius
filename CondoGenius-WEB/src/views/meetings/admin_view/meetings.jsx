import { useEffect } from 'react';
import { MdAddBox, MdRemoveCircleOutline } from 'react-icons/md';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from "../../../components/loading/loading";
import ModalContent from '../../../components/modal/modal_content';
import useMeetings from "../../../states/meetings/hooks/useMeetings";
import { FormatDateZone } from '../../../utils/utils';
import MeetingsForm from './containers/form/meetings_form';

import '../meetings.scss';

const MeetingsAdminView = () => {
    const meetings = useSelector((state) => state.meetings);

    const { loadingMeetings, getMeetings, deleteMeeting } = useMeetings();

    useEffect(() => {
        getMeetings();
    }, []);

    useEffect(() => {
        toast.error(meetings.error)
    }, [meetings.error]);

    const submitDeleteMeeting = async (e, meetingId) => {
        e.preventDefault();
        const response = await deleteMeeting(meetingId);

        if (response?.status === 200) {
            toast.success("Reunião cancelada com sucesso");
            getMeetings();
        };
    }
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
            <div className="button_register_content">
                <ModalContent
                    header={`Nova reunião`}
                    trigger={<Button className='button_content_open_modal'><MdAddBox />Cadastrar nova reunião</Button>}
                    children={<MeetingsForm />}
                />
            </div>
            <div className='list_view'>
                <Collection>
                <CollectionItem key="header" className='list_header'>
                    <span className='meeting_list_title'>Tema</span>
                    <span className='meeting_list_description'>Descrição</span>
                    <span>Data</span>
                    <span />
                </CollectionItem>
                {meetings.list?.length > 0 ? (
                    meetings.list.map(meeting => (
                        <CollectionItem key={meeting.id}>
                            <span className='meeting_list_title'>
                            {meeting.title}
                            </span>
                            <span className='meeting_list_description'>
                            {meeting.description}
                            </span>
                            <span>
                            {FormatDateZone(meeting.date)} às {meeting.hour}
                            </span>
                            <span className='button_delete_container'>
                                <ModalContent 
                                    header="Cancelar reunião"
                                    trigger={<MdRemoveCircleOutline/>}
                                    children={
                                        <span>
                                            <div>Tem certeza que deseja cancelar essa reunião?</div>
                                            <div className="modal_actions_button_content">
                                                <Button modal="close" node="button" className="red_button" onClick={(e) => submitDeleteMeeting(e, meeting.id)}>
                                                    Confirmar
                                                </Button>
                                            </div>
                                        </span>
                                    }
                                />
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