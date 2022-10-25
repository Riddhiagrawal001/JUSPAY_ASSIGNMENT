import { combineReducers } from "redux";
import spriteReducer from "./spriteReducer";
import motionReducer from "./motionReducer";
import multiActionReducer from "./multiActionReducer";

export default combineReducers({
  spriteReducer,
  motionReducer,
  multiActionReducer,
});
