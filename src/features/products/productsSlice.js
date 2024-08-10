import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    status: 'idle',
  },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
    }
  },
});

export const { setProducts, setStatus } = productsSlice.actions;
export default productsSlice.reducer;