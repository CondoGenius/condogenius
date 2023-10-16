import { ResidentActionType } from "./types";

export const setResidentAction = (payload) => ({
    type: ResidentActionType.SET_RESIDENT,
    payload
});

export const setResidentDeliveriesAction = (payload) => ({
    type: ResidentActionType.SET_DELIVERIES,
    payload
});

export const setResidentComplaintsAction = (payload) => ({
    type: ResidentActionType.SET_COMPLAINTS,
    payload
});

export const setResidentReservationsAction = (payload) => ({
    type: ResidentActionType.SET_RESERVATIONS,
    payload
});