import { createSlice } from "@reduxjs/toolkit";
import { removeCompleteEle } from "../utils/ActionMap";

const initialState = {
  dropZone0: {
    stack: [],
  },
  dropZone1: {
    stack: [],
  },
  dropZone2: {
    stack: [],
  },
  dropZone3: {
    stack: [],
  },
  currentTab: 0,
  currentExecutingZone: "",
};

const multiDropReducer = createSlice({
  name: "multiDrop",
  initialState,
  reducers: {
    addElementToDropZone: (state, action) => {
      state[action.payload.key] = {
        ...state[action.payload.key],
        stack: [...state[action.payload.key]["stack"], action.payload.value],
      };

      if (
        removeCompleteEle.includes(action.payload.value) ||
        action.payload.value.includes("control")
      ) {
        state[action.payload.key][action.payload.id] = [];
      }
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    appendRecursiveEventMulti: (state, action) => {
      state[action.payload.key][action.payload.id] = [
        ...state[action.payload.key][action.payload.id],
        action.payload.value,
      ];
    },
    setCurrentExecutingZone: (state, action) => {
      state.currentExecutingZone = action.payload;
    },
  },
});

export const {
  addElementToDropZone,
  setCurrentTab,
  appendRecursiveEventMulti,
  setCurrentExecutingZone,
} = multiDropReducer.actions;

export default multiDropReducer.reducer;
