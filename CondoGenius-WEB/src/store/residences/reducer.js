const INITIAL_STATE = {
  list: [],
  error: null
};

const residenceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_RESIDENCES":
        return {
          ...state,
          list: action.payload.list,
          error: action.payload.error
        }
      default:
        return state;
    }
};
  
export default residenceReducer;