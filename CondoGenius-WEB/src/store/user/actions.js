import { UserActionType } from "./types";

export const setUserAction = (userData) => (
    {
        type: UserActionType.SET_USER,
        payload: {
            data: userData
        }
    }
);