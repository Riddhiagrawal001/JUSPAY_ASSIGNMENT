import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ele: [],
  currentEleExecuting: "",
};

const midAreaReducer = createSlice({
  name: "midAreaReducer",
  initialState,
  reducers: {
    addElement: (state, action) => {
      state.ele = [...state.ele, action.payload];
    },
    setCurrentEleExecuting: (state, action) => {
      state.currentEleExecuting = action.payload;
    },
    removeElementMidArea: (state, action) => {
      state.ele = state.ele.filter(function (i) {
        return i !== action.payload;
      });
    },
  },
});

export const { addElement, setCurrentEleExecuting, removeElementMidArea } =
  midAreaReducer.actions;

export default midAreaReducer.reducer;
