
const INITIAL_STATE = {
  publications: [],
  myPublications: [],
  error: null
};

const hubDigitalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_PUBLICATIONS":
        return {
          ...state,
          publications: action.payload.publications,
          error: action.payload.error
        }
      case "SET_MY_PUBLICATIONS": 
        return {
          ...state,
          myPublications: action.payload.myPublications,
          error: action.payload.error
        }
      default:
        return state;
    }
};
  
export default hubDigitalReducer;