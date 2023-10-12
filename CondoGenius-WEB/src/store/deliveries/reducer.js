const INITIAL_STATE = {
  list: [],
  error: null
};

const deliveriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_DELIVERIES":
        return {
          ...state,
          list: action.payload.list,
          error: action.payload.error
        }
      default:
        return state;
    }
};
  
export default deliveriesReducer;