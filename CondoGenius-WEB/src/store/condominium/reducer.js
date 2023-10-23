const INITIAL_STATE = {
  data: null,
  error: null
};

const condominiumReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CONDOMINIUM":
      return {
        ...state,
        data: action.payload.data,
        error: action.payload.error
      }
    default:
      return state;
  }
};
  
export default condominiumReducer;