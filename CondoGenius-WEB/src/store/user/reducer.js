import UserModel from "../../models/user_model";

const userStorage = JSON.parse(localStorage.getItem('user'));

const INITIAL_STATE = {
    data: new UserModel({
      id: userStorage?.id ?? null,
      email: userStorage?.email ?? null,
      token: userStorage?.token ?? null,
      role: userStorage?.role ?? null,
      isAdmin: userStorage?.isAdmin ?? null,
      isLogged: userStorage?.isLogged ?? false
    })
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
        return {
          ...state,
          data: action.payload.data ? new UserModel({...action.payload.data}) : state.data
        }
      default:
        return state;
    }
};
  
export default userReducer;