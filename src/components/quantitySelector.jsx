import { removeItem } from '../features/cart/cartSlice';
import styles from '../styles/QuantitySelector.module.scss';
import { useDispatch } from 'react-redux';


const QuantitySelector = ({ onDecrease, onIncrease, product, existingProduct }) => {
    console.log("existingProduct in QuantitySelector:", existingProduct);
    const dispatch = useDispatch();

    const deleteItem = () => {
        const cartItemPayload = { productId: existingProduct.productId} ;
        dispatch(removeItem(cartItemPayload))
    }
    return (
        <div className={styles.middleContainer}>
            <div className={styles.middleContent}>

                <div className={styles.quantityControllerContainer}>
                    <div onClick={() => onDecrease(product)} className={styles.minusBtnContainer} >
                        <span className={styles.minusBtn}>-</span>
                    </div>
                    <div className={styles.quantityDisplayAreaContainer}>
                        <p className={styles.quantityDisplayArea}>{existingProduct.productQuantity}</p>
                    </div>
                    <div onClick={() => onIncrease(product)}
                        className={styles.plusBtnContainer}>
                        <span className={styles.plusBtn}>+</span>
                    </div>
                </div>

                <div className={styles.btnContainers} onClick={deleteItem}>
                    <span className={styles.deleteBtn}>Delete</span>
                </div>

            </div>
        </div>
    )
}

export default QuantitySelector;