import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sprites: {},
  currentSprite: "xxx",
};

const sprite = createSlice({
  name: "sprite",
  initialState,
  reducers: {
    addSprites: (state, action) => {
      if (action.payload.val.xPos !== undefined) {
        state.sprites[action.payload.id] = {
          ...state.sprites[action.payload.id],
          xPos: action.payload.val.xPos,
        };
      }
      if (action.payload.val.yPos !== undefined) {
        state.sprites[action.payload.id] = {
          ...state.sprites[action.payload.id],
          yPos: action.payload.val.yPos,
        };
      }
      if (action.payload.val.deg !== undefined) {
        state.sprites[action.payload.id] = {
          ...state.sprites[action.payload.id],
          deg: action.payload.val.deg,
        };
      }
    },
    setCurrentSprite: (state, action) => {
      state.currentSprite = action.payload;
    },
  },
});

export const { addSprites, setCurrentSprite } = sprite.actions;

export default sprite.reducer;
