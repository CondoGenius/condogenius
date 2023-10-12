import { ComplaintsActionType } from "./types";

export const setComplaintsAction = (payload) => ({
    type: ComplaintsActionType.SET_COMPLAINTS,
    payload
});