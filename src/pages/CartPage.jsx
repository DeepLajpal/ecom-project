import axios from 'axios';
import styles from '../styles/cart/CartPage.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSelector';
import CartSummary from '../components/cart/CartSummary';
import CartProductList from '../components/cart/CartProductList';
import { updateCartTotal, updateQuantity } from '../utils/cartUtils';

const CartPage = () => {
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTotalSaving, setCartTotalSaving] = useState(0);
  const [cartTotalItems, setCartTotalItems] = useState(0);
  const [cartProductsData, setCartProductsData] = useState([]);
  const cartProducts = useSelector(selectCartItems);

  const onDecrease = (product) => {
    const updatedProducts = updateQuantity(cartProductsData, product, 'decrease');
    setCartProductsData(updatedProducts);
    updateCartTotal(updatedProducts, setCartSubtotal, setCartTotalSaving, setCartTotalItems);
  };

  const onIncrease = (product) => {
    const updatedProducts = updateQuantity(cartProductsData, product, 'increase');
    setCartProductsData(updatedProducts);
    updateCartTotal(updatedProducts, setCartSubtotal, setCartTotalSaving, setCartTotalItems);
  };

  const getProducts = async () => {
    try {
      const productsData = await Promise.all(cartProducts.map(async (item) => {
        const response = await axios.get(`https://dummyjson.com/products/${item.productId}`);
        const product = response.data;
        return {
          ...product,
          productTotalQuantity: 1,
          productSubtotal: product.price.toFixed(2),
          productTotalSaving: (product.price - (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)
        };
      }));
      setCartProductsData(productsData);
      updateCartTotal(productsData, setCartSubtotal, setCartTotalSaving, setCartTotalItems);
    } catch (error) {
      console.log("API ERROR: Unable to fetch cartProducts");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.productCartContainer}>
      <div className={styles.productCartContent}>
        <div className={styles.cartHeadingContainer}>
          <h1 className={styles.cartHeading}>Your Cart</h1>
        </div>

        <CartSummary cartTotalItems={cartTotalItems} cartTotalSaving={cartTotalSaving} cartSubtotal={cartSubtotal} />

        <div className={styles.cartProductsTableContainer}>
          <CartProductList cartProductsData={cartProductsData} onDecrease={onDecrease} onIncrease={onIncrease} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
