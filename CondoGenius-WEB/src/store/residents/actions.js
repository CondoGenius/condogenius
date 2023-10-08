import { ResidentActionType } from "./types";

export const setResidents = (payload) => ({
    type: ResidentActionType.SET_RESIDENTS,
    payload,
});