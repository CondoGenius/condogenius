const INITIAL_STATE = {
  data: null,
  list: [],
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
  
export default residentReducer;