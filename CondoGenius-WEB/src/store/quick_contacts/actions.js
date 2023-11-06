import { QuickContactsActionType } from "./types";

export const setQuickContactsAction = (payload) => ({
    type: QuickContactsActionType.SET_QUICK_CONTACTS,
    payload
});