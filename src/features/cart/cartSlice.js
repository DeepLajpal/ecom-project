import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // item internal representation --> {productId, productQuantity, productSaving, productSubtotal}
  cartSubtotal: 0,
  cartTotalSaving: 0,
  cartTotalItems: 0,
};

const roundToTwoDecimal = (num) => {
  return Math.round(num * 100) / 100;
};

const newCartSubtotal = (productsData) => {
  return productsData.reduce((totalCartValue, currentProduct) => {
    return totalCartValue + parseFloat(currentProduct.productSubtotal);
  }, 0);
};
const newCartSavingTotal = (productsData) => {
  return productsData.reduce((totalCartValue, currentProduct) => {
    return totalCartValue + parseFloat(currentProduct.productSaving);
  }, 0);
};
const newCartTotalItems = (productsData) => {
  return productsData.reduce((totalCartValue, currentProduct) => {
    return totalCartValue + parseFloat(currentProduct.productQuantity);
  }, 0);
};

const updateCartSummary = (state) => {
  state.cartSubtotal = newCartSubtotal(state.items);
  state.cartTotalItems = newCartTotalItems(state.items);
  state.cartTotalSaving = newCartSavingTotal(state.items);
};

const productQuantityController = (product, existingItem, quantity, action) => {
  const productSaving = product.price * (product.discountPercentage / 100);
  const productSubtotal = product.price - productSaving;

  action === "decrease"
    ? existingItem.productQuantity > 1
      ? (existingItem.productQuantity -= quantity)
      : existingItem.productQuantity
    : (existingItem.productQuantity += quantity);
  existingItem.productSaving = roundToTwoDecimal(
    productSaving * existingItem.productQuantity
  );
  existingItem.productSubtotal = roundToTwoDecimal(
    productSubtotal * existingItem.productQuantity
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, increaseBy, stock } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        if (stock === 0) return alert("Out Of Stock");
        else if (existingItem.productQuantity === stock)
          alert(`You cannot add more than ${stock} quantities of this product`);
        else {
          productQuantityController(
            product,
            existingItem,
            increaseBy,
            (action = "increase")
          );
          updateCartSummary(state);
          return;
        }
      } else {
        const productSaving =
          product.price * (product.discountPercentage / 100);
        const productSubtotal = product.price - productSaving;
        state.items.push({
          productId: product?.id,
          productQuantity: increaseBy,
          productSaving: roundToTwoDecimal(productSaving),
          productSubtotal: roundToTwoDecimal(productSubtotal),
        });

        updateCartSummary(state);
        return;
      }
    },

    decreaseItem: (state, action) => {
      const { product, decreaseBy } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        productQuantityController(
          product,
          existingItem,
          decreaseBy,
          (action = "decrease")
        );
        updateCartSummary(state);
        return;
      }
    },

    removeItem: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      updateCartSummary(state);
      return;
    },
  },
});

export const { addItem, decreaseItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
