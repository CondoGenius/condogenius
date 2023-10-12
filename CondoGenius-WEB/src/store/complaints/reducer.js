const INITIAL_STATE = {
  list: [],
  error: null
};

const complaintsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_COMPLAINTS":
        return {
          ...state,
          list: action.payload.list,
          error: action.payload.error
        }
      default:
        return state;
    }
};
  
export default complaintsReducer;