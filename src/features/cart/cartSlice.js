import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // item internal representation --> {productId, productQuantity, productSaving, productSubtotal}
  cartSubtotal: 0,
  cartTotalSaving: 0,
  cartTotalItems: 0,
};

const productQuantityController =(product, existingItem, quantity, action)=>{
  const productSaving = product.price * (product.discountPercentage/ 100);
  const productSubtotal = product.price - productSaving ;

  action === "decrease"?
   (existingItem.productQuantity > 1 ? existingItem.productQuantity -= quantity :  existingItem.productQuantity)
   : existingItem.productQuantity += quantity;
        existingItem.productSaving = (productSaving * existingItem.productQuantity).toFixed(2);
        existingItem.productSubtotal = (productSubtotal * existingItem.productQuantity).toFixed(2);
}

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
          productQuantityController(product, existingItem, increaseBy, action="increase")
          return
        }
      } else {
        const productSaving = product.price * (product.discountPercentage/ 100);
        const productSubtotal = product.price - productSaving ;
        state.items.push({
          productId: product?.id,
          productQuantity: increaseBy,
          productSaving: productSaving.toFixed(2),
          productSubtotal: productSubtotal.toFixed(2),
        });
      }
    },
    decreaseItem: (state, action) => {
      const { product, decreaseBy } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        productQuantityController(product, existingItem, decreaseBy, action="decrease")
      }
    },
    removeItem:(state,action)=>{
      const { productId } = action.payload;
      state.items = state.items.filter(
        (item) => item.productId !== productId
      );
      return 
    }
  },
});

export const { addItem, decreaseItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
