const INITIAL_STATE = {
  data: null,
  deliveries: [],
  complaints: [],
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