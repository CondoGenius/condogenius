import { ReservationActionType } from "./types";

export const setReservationsAction = (payload) => ({
    type: ReservationActionType.SET_RESERVATIONS,
    payload
});