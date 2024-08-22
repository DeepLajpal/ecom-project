
import styles from '../../styles/cart/CartProduct.module.scss'
import QuantitySelector from '../QuantitySelector';
const CartProduct = ({ product, onDecrease, onIncrease }) => {
    return (<div className={styles.cartProductsTableDataContainer}>

        <div className={styles.cartProductsTableDataContent}>

            <div className={styles.leftSideContainer}>
                <div className={styles.leftSideContent}>

                    <div className={styles.leftSide}>
                        <img className={styles.productImg} src={product.images[0]} alt="" />
                    </div>

                    <div className={styles.rightSide}>
                        <span className={styles.productName}>{product.title}</span>
                        <div className={styles.productPriceContainer}>
                            <span className={styles.productActualPrice}>₹ {(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}</span>
                            <span className={styles.productSavingPrice}>₹{product.price}</span>
                        </div>
                    </div>

                </div>
            </div>

            <QuantitySelector onDecrease={onDecrease} onIncrease={onIncrease} product={product} />

            <div className={styles.rightSideContainer}>
                <div className={styles.productPriceContainer}>
                    <span className={styles.productActualPrice}> ₹{product.productSubtotal}</span>
                    <span className={styles.productSavingPrice}>Saved: <span className={styles.savingAmt}>₹{product.productTotalSaving}</span></span>
                </div>
            </div>

        </div>

    </div>)
}

export default CartProduct