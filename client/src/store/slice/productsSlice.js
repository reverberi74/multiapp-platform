import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: "1",
      name: "Smart TV Samsung",
      price: 499,
      image: "https://placehold.co/600x400"
    },
    {
      id: "2",
      name: "Notebook Lenovo",
      price: 899,
      image: "https://placehold.co/600x400"
    },
    {
      id: "3",
      name: "Smartphone Xiaomi",
      price: 299,
      image: "https://placehold.co/600x400"
    }
  ]
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Qui aggiungerai reducer veri
  }
});

export default productsSlice.reducer;

