import styles from '../styles/QuantitySelector.module.scss';
const QuantitySelector = ({onDecrease, onIncrease, product}) => {
    return (
        <div className={styles.middleContainer}>
            <div className={styles.middleContent}>

                <div className={styles.quantityControllerContainer}>
                    <div onClick={() => onDecrease(product)} className={styles.minusBtnContainer} >
                        <span className={styles.minusBtn}>-</span>
                    </div>
                    <div className={styles.quantityDisplayAreaContainer}>
                        <p className={styles.quantityDisplayArea}>{product.productTotalQuantity}</p>
                    </div>
                    <div onClick={() => onIncrease(product)}
                        className={styles.plusBtnContainer}>
                        <span className={styles.plusBtn}>+</span>
                    </div>
                </div>

                <div className={styles.btnContainers}>
                    <span className={styles.deleteBtn}>Delete</span>
                </div>

            </div>
        </div>
    )
}

export default QuantitySelector;