import axios from 'axios';
import styles from '../styles/cart/CartPage.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalSaving, selectCartSubtotal, selectCartTotalItems} from '../features/cart/cartSelector';
import CartSummary from '../components/cart/CartSummary';
import CartProductList from '../components/cart/CartProductList';
import { addItem, decreaseItem } from '../features/cart/cartSlice';
import Loader from '../components/Loader';
const CartPage = () => {

  const [cartProductsData, setCartProductsData] = useState([]);
  const [loading, setLoading] = useState(true)
  const cartProducts = useSelector(selectCartItems);
  const cartTotalItems = useSelector(selectCartTotalItems);
  const cartSubtotal = useSelector(selectCartSubtotal);
  const cartTotalSaving = useSelector(selectCartTotalSaving);
  const dispatch = useDispatch();

  console.log("cartProducts", cartProducts)

  const onDecrease = (product) => {
    const cartItemPayload = { product, decreaseBy: 1 };
    dispatch(decreaseItem(cartItemPayload));
    console.log("decrease clicked")
  }

  const onIncrease = (product) => {
   const cartItemPayload = { product, increaseBy: 1, stock: product.stock };
   dispatch(addItem(cartItemPayload));
   console.log("increase clicked")
  };

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
      <div className={styles.productCartContent}>
        <div className={styles.cartHeadingContainer}>
          <h1 className={styles.cartHeading}>Your Cart</h1>
        </div>

        <CartSummary cartTotalItems={cartTotalItems} cartTotalSaving={cartTotalSaving} cartSubtotal={cartSubtotal} />

        <div className={styles.cartProductsTableContainer}>
         { loading === true ? <Loader/>:  <CartProductList cartProductsData={cartProductsData} cartProducts={cartProducts} onDecrease={onDecrease} onIncrease={onIncrease} loading={loading} setLoading= {setLoading}/>}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
