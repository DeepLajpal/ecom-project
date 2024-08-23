import { createSlice } from "@reduxjs/toolkit";

// Initial state of the cart
const initialState = {
  items: [], // Each item contains {productId, productQuantity, productSaving, productSubtotal}
  cartSubtotal: 0, // Total price of all products in the cart
  cartTotalSaving: 0, // Total savings from discounts on all products in the cart
  cartTotalItems: 0, // Total number of items in the cart
};

// Function to round numbers to two decimal places
const roundToTwoDecimal = (num) => {
  return Math.round(num * 100) / 100;
};

// Calculate the total cart subtotal (sum of all product subtotals)
const newCartSubtotal = (productsData) => {
  return productsData.reduce((totalCartValue, currentProduct) => {
    return totalCartValue + parseFloat(currentProduct.productSubtotal);
  }, 0);
};

// Calculate the total savings from all products in the cart
const newCartSavingTotal = (productsData) => {
  return productsData.reduce((totalCartValue, currentProduct) => {
    return totalCartValue + parseFloat(currentProduct.productSaving);
  }, 0);
};

// Calculate the total quantity of items in the cart
const newCartTotalItems = (productsData) => {
  return productsData.reduce((totalCartValue, currentProduct) => {
    return totalCartValue + parseFloat(currentProduct.productQuantity);
  }, 0);
};

// Update the cart summary (subtotal, total savings, and total items)
const updateCartSummary = (state) => {
  state.cartSubtotal = newCartSubtotal(state.items);
  state.cartTotalItems = newCartTotalItems(state.items);
  state.cartTotalSaving = newCartSavingTotal(state.items);
};

// Function to adjust product quantity and update savings and subtotal
const productQuantityController = (product, existingItem, quantity, action) => {
  const productSaving = product.price * (product.discountPercentage / 100);
  const productSubtotal = product.price - productSaving;

  // Adjust quantity based on action (increase or decrease)
  if (action === "decrease") {
    existingItem.productQuantity = Math.max(existingItem.productQuantity - quantity, 1);
  } else {
    existingItem.productQuantity += quantity;
  }

  // Update the savings and subtotal for the item with rounded values
  existingItem.productSaving = roundToTwoDecimal(productSaving * existingItem.productQuantity);
  existingItem.productSubtotal = roundToTwoDecimal(productSubtotal * existingItem.productQuantity);
};

// Create the cart slice with actions and reducers
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to the cart or increase quantity if it already exists
    addItem: (state, action) => {
      const { product, increaseBy, stock } = action.payload;
      const existingItem = state.items.find((item) => item.productId === product.id);

      if (existingItem) {
        if (stock === 0) return alert("Out Of Stock");
        else if (existingItem.productQuantity === stock)
          alert(`You cannot add more than ${stock} quantities of this product`);
        else {
          productQuantityController(product, existingItem, increaseBy, (action = "increase"));
          updateCartSummary(state); // Update cart summary after adding item
          return;
        }
      } else {
        // Add new item to the cart if it doesn't exist
        const productSaving = product.price * (product.discountPercentage / 100);
        const productSubtotal = product.price - productSaving;
        state.items.push({
          productId: product?.id,
          productQuantity: increaseBy,
          productSaving: roundToTwoDecimal(productSaving),
          productSubtotal: roundToTwoDecimal(productSubtotal),
        });

        updateCartSummary(state); // Update cart summary after adding new item
        return;
      }
    },

    // Decrease the quantity of an item in the cart
    decreaseItem: (state, action) => {
      const { product, decreaseBy } = action.payload;
      const existingItem = state.items.find((item) => item.productId === product.id);

      if (existingItem) {
        productQuantityController(product, existingItem, decreaseBy, (action = "decrease"));
        updateCartSummary(state); // Update cart summary after decreasing item quantity
        return;
      }
    },

    // Remove an item from the cart
    removeItem: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      updateCartSummary(state); // Update cart summary after removing item
      return;
    },
  },
});

// Export actions and reducer
export const { addItem, decreaseItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
