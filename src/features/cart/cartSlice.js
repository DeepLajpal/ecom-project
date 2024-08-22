import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // item internal representation --> {productId, productQuantity, productSaving, productSubtotal}
  cartSubtotal: 0,
  cartTotalSaving: 0,
  cartTotalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, increaseBy, stock } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.productId
      );

      if (existingItem) {
        if (stock === 0) return alert("Out Of Stock");
        else if (existingItem.productQuantity === stock)
          alert(`You cannot add more than ${stock} quantities of this product`);
        else {
          existingItem.productQuantity += increaseBy;
          existingItem.productSaving = ((product.price - (product.price - (product.price * product.discountPercentage) / 100)) * existingItem.productQuantity).toFixed(2);
          existingItem.productSubtotal = (product.price * existingItem.productQuantity).toFixed(2);
          return
        }
      } else {
        state.items.push({
          productId: product?.productId,
          productQuantity: increaseBy,
          productSaving: (product.price - (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2),
          productSubtotal: product.price.toFixed(2),
        });
      }
    },
    removeItem: (state, action) => {
      const { product, decreaseBy } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.productId
      );

      if (existingItem) {
        console.log("existingItem", existingItem);

        existingItem.productQuantity -= decreaseBy;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
