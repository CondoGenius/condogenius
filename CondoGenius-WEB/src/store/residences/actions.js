import { ResidenceActionType } from "./types";

export const setResidences = (payload) => ({
    type: ResidenceActionType.SET_RESIDENCES,
    payload,
});