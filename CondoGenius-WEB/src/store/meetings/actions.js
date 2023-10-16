import { MeetingsActionType } from "./types";

export const setMeetingsAction = (payload) => ({
    type: MeetingsActionType.SET_MEETINGS,
    payload
});