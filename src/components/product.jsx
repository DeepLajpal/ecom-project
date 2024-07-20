
const Product = ({title, price, images, styles}) => {
    return (
        <div className={styles['product-content']}>
            <div className={styles['product-img-container']}>
                <img className={styles['product-img']} src={images} />
            </div>
            <div className={styles['product-details']}>
                <p className={styles['product-title']}>{title}</p>
                <p className={styles['product-price']}>₹{price}</p>
            </div>
        </div>
    )
}

export default Product ;