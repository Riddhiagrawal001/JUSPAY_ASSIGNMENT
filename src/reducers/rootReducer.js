import { combineReducers } from "redux";
import spriteReducer from "./spriteReducer";
import motionReducer from "./motionReducer";
import multiActionReducer from "./multiActionReducer";
import midAreaReducer from "./midAreaReducer";
import multiDropReducer from "./multiDropReducer";

export default combineReducers({
  spriteReducer,
  motionReducer,
  multiActionReducer,
  midAreaReducer,
  multiDropReducer,
});
