import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShown: false,
};

export const showCartSlice = createSlice({
  name: "showCart",
  initialState,
  reducers: {
    showCart: (state) => {
      state.isShown = true;
    },
    hideCart: (state) => {
      state.isShown = false;
    },
  },
});

export const { showCart, hideCart } = showCartSlice.actions;
export default showCartSlice.reducer;
