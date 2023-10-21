import { HubDigitalActionsType } from "./types";

export const setPublicationsActions = (payload) => ({
    type: HubDigitalActionsType.SET_PUBLICATIONS,
    payload
});

export const setMyPublicationsActions = (payload) => ({
    type: HubDigitalActionsType.SET_MY_PUBLICATIONS,
    payload
});