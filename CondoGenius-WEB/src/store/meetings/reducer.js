const INITIAL_STATE = {
  list: [],
  error: null
};

const meetingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_MEETINGS":
        return {
          ...state,
          list: action.payload.list,
          error: action.payload.error
        }
      default:
        return state;
    }
};
  
export default meetingsReducer;