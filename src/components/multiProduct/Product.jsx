import { Link } from 'react-router-dom';
import styles from '../../styles/multiProduct/Product.module.scss';
import Button from '../generic/Button.jsx';

const Product = ({ product }) => {
    return (
        <div className={styles.productContainer}>

            <div className={styles.productContent}>
            <Link to={`product/${product.id}`}>
                <div className={styles.productImgContainer}>
                    <img className={styles.productImg} src={product.images[0]} alt={product.title} />
                </div>
                <div className={styles.productDetails}>
                    <p className={styles.productTitle}>{product.title}</p>
                    <p className={styles.productPrice}>₹{product.price}</p>
                </div>
            </Link>
                <div className={styles.buttonContainer}>
                    <Button btnTxt="Add to cart"/>
                </div>
            </div>

        </div>


    );
}

export default Product;
