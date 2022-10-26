import { createSlice } from "@reduxjs/toolkit";
import { removeCompleteEle } from "../utils/ActionMap";

const initialState = {};

const multiAction = createSlice({
  name: "multiAction",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state[action.payload] = [];
    },
    appendRecursiveEvent: (state, action) => {
      state[action.payload.key] = [
        ...state[action.payload.key],
        action.payload.value,
      ];
    },
    removeEle: (state, action) => {
      if (removeCompleteEle.includes(action.payload))
        delete state[action.payload];
      else {
        let ele = [];
        removeCompleteEle.map((item) => {
          if (state.hasOwnProperty(item)) ele.push(item);
        });
        ele.map((item) => {
          state[item] = state[item].filter(function (i) {
            return i !== action.payload;
          });
        });
      }
    },
  },
});

export const { addEvent, appendRecursiveEvent, removeEle } =
  multiAction.actions;

export default multiAction.reducer;
