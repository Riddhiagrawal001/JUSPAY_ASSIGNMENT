import { combineReducers } from "redux";
import spriteReducer from "./spriteReducer";
import motionReducer from "./motionReducer";
import multiActionReducer from "./multiActionReducer";
import midAreaReducer from "./midAreaReducer";

export default combineReducers({
  spriteReducer,
  motionReducer,
  multiActionReducer,
  midAreaReducer,
});
