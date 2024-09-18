import axios from 'axios';
import styles from '../styles/cart/CartPage.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalSaving, selectCartSubtotal, selectCartTotalItems} from '../features/cart/cartSelector';
import CartSummary from '../components/cart/CartSummary';
import CartProductList from '../components/cart/CartProductList';
import Loader from '../components/Loader';
import EmptyCart from '../components/cart/EmptyCart';
const CartPage = () => {

  const [cartProductsData, setCartProductsData] = useState([]);
  const [loading, setLoading] = useState(true)
  const cartProducts = useSelector(selectCartItems);
  const cartTotalItems = useSelector(selectCartTotalItems);
  const cartSubtotal = useSelector(selectCartSubtotal);
  const cartTotalSaving = useSelector(selectCartTotalSaving);

  const getProducts = async () => {
    try {
      setLoading(true);
      const productsData = await Promise.all(cartProducts.map(async (item) => {
        const response = await axios.get(`https://dummyjson.com/products/${item.productId}`);
        const product = response.data;
        return product
      }));
      setCartProductsData(productsData);
      setLoading(false);
    } catch (error) {
      console.log("API ERROR: Unable to fetch cartProducts");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.productCartContainer}>
     {cartTotalItems > 0 ? <div className={styles.productCartContent}>
        <div className={styles.cartHeadingContainer}>
          <h1 className={styles.cartHeading}>Your Cart</h1>
        </div>

        <CartSummary cartTotalItems={cartTotalItems} cartTotalSaving={cartTotalSaving} cartSubtotal={cartSubtotal} />

        <div className={styles.cartProductsTableContainer}>
         { loading === true ? <Loader/>:  <CartProductList cartProductsData={cartProductsData} cartProducts={cartProducts} />}
        </div>
      </div> : <EmptyCart/>}
    </div>
  );
};

export default CartPage;
