import { CondominiumActionType } from "./types";

export const setCondominiumAction = (payload) => ({
    type: CondominiumActionType.SET_CONDOMINIUM,
    payload
});