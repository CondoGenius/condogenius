import { ResidentsActionType } from "./types";

export const setResidentsAction = (payload) => ({
    type: ResidentsActionType.SET_RESIDENTS,
    payload,
});
