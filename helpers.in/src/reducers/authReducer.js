import { SET_CURRENT_USER, USER_LOADING, UPDATE_CURRENT_USER, FETCH_JOB_SEEKERS } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      //console.log("SetUser reducer "+ action.payload);
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
      case UPDATE_CURRENT_USER:
        //console.log("SetUser reducer "+ action.payload);
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
        case FETCH_JOB_SEEKERS:
          console.log("fetch see "+ action.payload.result[0].name);
          return {
            ...state,
            isAuthenticated : true,
            Seekers : action.payload
          }
    default:
      return state;
  }
}
