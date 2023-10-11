import { ResidentsActionType } from "./types";

export const setResident = (payload) => ({
    type: ResidentsActionType.SET_RESIDENT,
    payload
});

export const setResidents = (payload) => ({
    type: ResidentsActionType.SET_RESIDENTS,
    payload,
});
