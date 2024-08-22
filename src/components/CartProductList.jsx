import CartProduct from './CartProduct';
import styles from '../styles/CartProductList.module.scss'

const CartProductList = ({ cartProductsData, onDecrease, onIncrease }) => {
  return (
    <div className={styles.cartProductsTableContent}>
      <div className={styles.cartProductsTableHeaderContainer}>
        <div className={styles.cartProductsTableHeaderContent}>
          <span className={styles.productDetails}>Items</span>
          <span className={styles.productQuantity}>Quantity</span>
          <span className={styles.productSubtotal}>Sub-total</span>
        </div>
      </div>

      {cartProductsData.map((product) => (
        <CartProduct key={product.id} onDecrease={onDecrease} onIncrease={onIncrease} product={product} />
      ))}
    </div>
  );
};

export default CartProductList;
