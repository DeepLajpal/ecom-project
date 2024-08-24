import { Link } from 'react-router-dom';
import styles from '../../styles/multiProduct/Product.module.scss';
import Button from '../generic/Button.jsx';

const Product = ({ product }) => {
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
                    <Button btnTxt="Add to cart" />
                </div>

            </div>

        </div>


    );
}

export default Product;
