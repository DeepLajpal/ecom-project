import styles from '../../styles/cart/CartSummary.module.scss';
const CartSummary = ({cartTotalItems, cartTotalSaving, cartSubtotal}) => {
    return <div className={styles.productCartSubtotalAndCheckoutBtnContainer}>
        <div className={styles.productCartSubtotalAndCheckoutBtnContent}>

            <div className={styles.subtotalContainer}>
                <div className={styles.cartSubtotal}>
                    Subtotal ({cartTotalItems} items): ₹ <span className={styles.cartTotalItems}>{cartSubtotal}</span>
                </div>
                <div className={styles.savingTotal}>
                    Savings: ₹ <span className={styles.savingTotalAmt}>{cartTotalSaving}</span>
                </div>
            </div>

            <div className={styles.checkoutBtnContainer}>
                <div className={styles.checkoutBtnContent}>
                    <button className={styles.checkoutBtn}>Checkout</button>
                </div>
            </div>

        </div>
    </div>
}

export default CartSummary