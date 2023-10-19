import { UserActionType } from "./types";

export const setUserAction = (payload) => ({
    type: UserActionType.SET_USER,
    payload
});