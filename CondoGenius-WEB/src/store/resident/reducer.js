const INITIAL_STATE = {
  data: null,
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
          data: action.payload.data,
          deliveries: action.payload.deliveries,
          complaints: action.payload.complaints,
          reservations: action.payload.reservations,
          error: action.payload.error
        }
      default:
        return state;
    }
};
  
export default residentReducer;