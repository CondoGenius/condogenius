const INITIAL_STATE = {
  list: {},
  areas: [],
  error: null
};

const reservationsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_RESERVATIONS":
        return {
          ...state,
          list: action.payload.list, // id, reserva e guestList
          areas: action.payload.areas,
          error: action.payload.error
        }
      default:
        return state;
    }
};

export default reservationsReducer;