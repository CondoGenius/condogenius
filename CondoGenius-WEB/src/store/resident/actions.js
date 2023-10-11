import { ResidentActionType } from "./types";

export const setResidentAction = (payload) => ({
    type: ResidentActionType.SET_RESIDENT,
    payload
});