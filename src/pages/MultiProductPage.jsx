
import Product from "../components/Product";
import { Link } from "react-router-dom";
import styles from '../styles/MultiProductPage.module.css';
import { selectProductsItems } from '../features/products/productsSelector';
import { useSelector } from 'react-redux';

const MultiProductPage = () => {

    const products = useSelector(selectProductsItems);
    return (
        <>
            <div className={styles["multi-product-card-container"]}>
                {products?.map((product) => {
                    return (
                        <div className={styles["product-container"]} key={product.id}>
                            <Link to={`product/${product.id}`}>
                                <Product title={product.title} price={product.price} images={product.images[0]} styles={styles} />
                            </Link>
                        </div>
                    )
                }
                )}
            </div>

        </>
    )
}

export default MultiProductPage