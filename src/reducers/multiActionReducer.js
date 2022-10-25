import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { addEvent, appendRecursiveEvent } = multiAction.actions;

export default multiAction.reducer;
