import CartProduct from './CartProduct';
import styles from '../../styles/cart/CartProductList.module.scss'

const CartProductList = ({ cartProductsData, onDecrease, onIncrease, cartProducts,loading, setLoading }) => {
  return (
    <div className={styles.cartProductsTableContent}>
      <div className={styles.cartProductsTableHeaderContainer}>
        <div className={styles.cartProductsTableHeaderContent}>
          <span className={styles.productDetails}>Items</span>
          <span className={styles.productQuantity}>Quantity</span>
          <span className={styles.productSubtotal}>Sub-total</span>
        </div>
      </div>

      {cartProductsData.map((product) => {
        const existingProduct = cartProducts.find((cartProduct) => cartProduct.productId === product.id);
        return <CartProduct key={product.id} onDecrease={onDecrease} onIncrease={onIncrease} product={product} existingProduct={existingProduct} />
      }
      )}
    </div>
  );
};

export default CartProductList;
