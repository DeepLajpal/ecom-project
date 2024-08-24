import styles from '../../styles/multiProduct/Product.module.scss';

const Product = ({ product }) => {
    return (
        <div className={styles.productContainer}>

            <div className={styles.productContent}>
                <div className={styles.productImgContainer}>
                    <img className={styles.productImg} src={product.images[0]} alt={product.title} />
                </div>
                <div className={styles.productDetails}>
                    <p className={styles.productTitle}>{product.title}</p>
                    <p className={styles.productPrice}>₹{product.price}</p>
                </div>
            </div>

        </div>


    );
}

export default Product;
