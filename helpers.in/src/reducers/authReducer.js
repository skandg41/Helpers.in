import { SET_CURRENT_USER, USER_LOADING, UPDATE_CURRENT_USER, FETCH_JOB_SEEKERS } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  Seeker: [{_id: "", name: "", mobile:"", location: "", review:[]}],
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
          console.log("fetch see "+ action.payload);
          console.log(state.Seeker);
          return {
            ...state,
            isAuthenticated : true,
            Seeker : [...state.Seeker, action.payload]
          }

        
    default:
      return state;
  }
}