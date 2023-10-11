import ResidentModel from "../../models/resident_model";

const residentStorage = JSON.parse(localStorage.getItem('resident'));

const INITIAL_STATE = {
  data: new ResidentModel({
    id: residentStorage?.id ?? null,
    userId: residentStorage?.userId ?? null,
    cpf: residentStorage?.cpf ?? null,
    email: residentStorage?.email ?? null,
    name: residentStorage?.name ?? null,
    lastName: residentStorage?.lastName ?? null,
    contact: residentStorage?.contact ?? null,
    birthday: residentStorage?.birthday ?? null
  }),
  deliveries: [],
  error: null
};

const residentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_RESIDENT":
        return {
          ...state,
          data: action.payload.data,
          error: action.payload.error
        }
      default:
        return state;
    }
};
  
export default residentReducer;