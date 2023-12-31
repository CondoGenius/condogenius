const INITIAL_STATE = {
  list: [],
  error: null
};

const residentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_RESIDENTS":
        return {
          ...state,
          list: action.payload.list,
          error: action.payload.error
        }
      default:
        return state;
    }
};
  
export default residentsReducer;