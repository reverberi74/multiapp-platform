import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "../../config/axiosClient"; // Usiamo axiosClient qui

// Thunk asincrono per caricare prodotti
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Errore nel caricamento prodotti");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Se vuoi in futuro aggiungere reducer sincroni (es. filtri)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
