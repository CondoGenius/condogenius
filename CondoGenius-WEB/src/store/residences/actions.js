import { ResidenceActionType } from "./types";

export const setResidencesAction = (payload) => ({
    type: ResidenceActionType.SET_RESIDENCES,
    payload,
});