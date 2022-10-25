import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  move: 10,
  clockTurn: 15,
  antiClockTurn: 15,
  xyPos: { x: 0, y: 0 },
  cursorPos: { x: 0, y: 0 },
  currentElement: "",
};

const motion = createSlice({
  name: "motion",
  initialState,
  reducers: {
    changeMove: (state, action) => {
      state.move = action.payload;
    },
    changeClockTurn: (state, action) => {
      state.clockTurn = action.payload;
    },
    changeAntiClockTurn: (state, action) => {
      state.antiClockTurn = action.payload;
    },
    goToYPos: (state, action) => {
      state.xyPos = { ...state.xyPos, y: action.payload.y };
    },
    goToXPos: (state, action) => {
      state.xyPos = { ...state.xyPos, x: action.payload.x };
    },
    getCursorPos: (state, action) => {
      state.cursorPos = { x: action.payload.x, y: action.payload.y };
    },
    currentClickedElement: (state, action) => {
      state.currentElement = action.payload;
    },
  },
});

export const {
  changeMove,
  changeClockTurn,
  changeAntiClockTurn,
  goToXPos,
  goToYPos,
  getCursorPos,
  currentClickedElement,
} = motion.actions;

export default motion.reducer;
