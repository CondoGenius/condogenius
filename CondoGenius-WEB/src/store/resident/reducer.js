import ResidentModel from '../../models/resident_model';

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
    birthday: residentStorage?.birthday ?? null,
    residenceId: residentStorage?.residenceId ?? null,
  }),
  deliveries: [],
  complaints: [],
  reservations: [], // id, list, guestList
  error: null
};

const residentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_RESIDENT":
        return {
          ...state,
          data: action.payload.data ? new ResidentModel({...action.payload.data}) : state.data,
          error: action.payload.error
        }
      case "SET_DELIVERIES": 
        return {
          ...state,
          deliveries: action.payload.deliveries,
          error: action.payload.error
        }
      case "SET_COMPLAINTS": 
        return {
          ...state,
          complaints: action.payload.complaints,
          error: action.payload.error
        }
      case "SET_RESERVATIONS": 
        return {
          ...state,
          reservations: action.payload.reservations,
          error: action.payload.error
        }
      default:
        return state;
    }
};
  
export default residentReducer;