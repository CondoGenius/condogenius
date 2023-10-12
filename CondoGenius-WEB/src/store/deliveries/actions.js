import { DeliveriesActionType } from "./types";

export const setDeliveriesAction = (payload) => ({
    type: DeliveriesActionType.SET_DELIVERIES,
    payload
});