import { Link } from 'react-router-dom';
import styles from '../../styles/multiProduct/Product.module.scss';
import Button from '../generic/Button.jsx';
import { addItem } from '../../features/cart/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../features/cart/cartSelector.js';
import QuantitySelector from '../QuantitySelector.jsx';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const cartProducts = useSelector(selectCartItems);
    const existingProduct = cartProducts?.find((cartProduct) => cartProduct.productId === product.id)
    const existingProductQuantity = existingProduct?.productQuantity ?? 0;

    const handleIncrease = () => {
        const cartItemPayload = { product, increaseBy: 1, stock: product.stock };
        dispatch(addItem(cartItemPayload));
    }

    return (
        <div className={styles.productContainer}>

            <div className={styles.productContent}>

                <div className={styles.productImgContainer}>
                    <img className={styles.productImg} src={product.images[0]} alt={product.title} />
                </div>
                <div className={styles.productTextContainer}>
                    <Link className={styles.linkWrapper} to={`product/${product.id}`}>
                        <p className={styles.productBrand}>{product.brand}</p>
                    </Link>
                    <Link className={styles.linkWrapper} to={`product/${product.id}`}>
                        <p className={styles.productTitle}>{product.title}</p>
                    </Link>
                </div>
                <div className={styles.productPriceContainer}>
                    <span className={styles.productActualPrice}>₹ {(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}</span>
                    <span className={styles.productSavingPrice}>₹{product.price}</span>
                </div>
                <div className={styles.buttonContainer}>
                    {existingProductQuantity === 0 ?

                        <Button btnTxt="Add to Cart" onClick={handleIncrease} />
                        :
                        <QuantitySelector product={product} existingProduct={existingProduct} />
                    }
                </div>

            </div>

        </div>


    );
}

export default Product;
