import { QuickContactsActionType } from "./types";

export const quickContactsAction = (payload) => ({
    type: QuickContactsActionType.SET_QUICK_CONTACTS,
    payload
});