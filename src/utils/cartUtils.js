export const updateCartTotal = (productsData, setCartSubtotal, setCartTotalSaving, setCartTotalItems) => {
  const newCartSubtotal = productsData.reduce((totalCartValue, currentProduct) => {
    const productPriceAfterDiscount = (currentProduct.price - ((currentProduct.price * currentProduct.discountPercentage) / 100)) * currentProduct.productTotalQuantity;
    return totalCartValue + productPriceAfterDiscount;
  }, 0);

  const newCartSavingTotal = productsData.reduce((totalCartSavingTotal, currentProduct) => {
    const currentProductSaving = (currentProduct.price - (currentProduct.price - (currentProduct.price * currentProduct.discountPercentage) / 100)) * currentProduct.productTotalQuantity;
    return totalCartSavingTotal + currentProductSaving;
  }, 0);

  const newCartTotalItems = productsData.reduce((totalCartItems, currentProduct) => {
    const currentProductTotalQuantity = currentProduct.productTotalQuantity;
    return totalCartItems + currentProductTotalQuantity;
  }, 0);

  setCartSubtotal(newCartSubtotal.toFixed(2));
  setCartTotalSaving(newCartSavingTotal.toFixed(2));
  setCartTotalItems(newCartTotalItems);
};

export const updateQuantity = (productsData, product, action) => {
  return productsData.map((cartProduct) => {
    if (cartProduct.id === product.id && ((action === 'increase' && cartProduct.productTotalQuantity < cartProduct.stock) ||
        (action === 'decrease' && cartProduct.productTotalQuantity > 1))) {
      const newQuantity = action === 'increase' ? cartProduct.productTotalQuantity + 1 : cartProduct.productTotalQuantity - 1;
      const productSubtotal = (cartProduct.price * newQuantity).toFixed(2);
      const productTotalSaving = (productSubtotal - (productSubtotal - ((productSubtotal * cartProduct.discountPercentage) / 100))).toFixed(2);
      return {
        ...cartProduct,
        productSubtotal,
        productTotalQuantity: newQuantity,
        productTotalSaving
      };
    }
    return cartProduct;
  });
};
