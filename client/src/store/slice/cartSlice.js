import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [] // array di prodotti nel carrello
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
