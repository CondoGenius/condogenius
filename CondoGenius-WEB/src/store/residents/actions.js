import { ResidentActionType } from "./types";

export const setUserAction = (payload) => (
    {
        type: ResidentActionType.SET_RESIDENTS,
        payload
    }
);