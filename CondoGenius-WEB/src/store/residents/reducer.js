const INITIAL_STATE = {
    residents: []
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_RESIDENTS":
        return {
          ...state,
          residents: action.payload.residents
        }
      default:
        return state;
    }
};
  
export default userReducer;