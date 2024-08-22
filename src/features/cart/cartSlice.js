import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartSubtotal: 0,
  cartTotalSaving: 0,
  cartTotalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { productId, increaseBy, stock } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        if (stock === 0) return alert("Out Of Stock");
        else if (existingItem.quantityTotal === stock)
          alert(
            `You cannot add more than ${stock} quantities of this product`
          );
        else (existingItem.quantityTotal += increaseBy);
      } else {
        state.items.push({
          productId,
          quantityTotal: increaseBy,
        });
      }
    },
    removeItem: (state, action) => {
      const { productId, decreaseBy } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        console.log("existingItem", existingItem);

        existingItem.quantityTotal -= decreaseBy;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
