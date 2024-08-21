import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { productId, increaseBy } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
    
      if (existingItem) {
        console.log("existingItem", existingItem)
        existingItem.quantityTotal += increaseBy;
      } else {
        state.items.push({
          productId,
          quantityTotal: increaseBy,
        });
      }
    },    
    removeItem: (state, action) => {
      const {productId, decreaseBy} = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem){
        console.log("existingItem", existingItem)

        existingItem.quantityTotal -= decreaseBy;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
