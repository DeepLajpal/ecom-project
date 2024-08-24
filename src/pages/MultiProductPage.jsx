import Product from "../components/Product";
import { Link } from "react-router-dom";
import styles from '../styles/MultiProductPage.module.scss';
import { selectProductsItems } from '../features/products/productsSelector';
import { useSelector } from 'react-redux';

const MultiProductPage = () => {
    const products = useSelector(selectProductsItems);
    return (
        <div className={styles.multiProductCardContainer}>
            {products?.map((product) => {
                return (
                    <div className={styles.productContainer} key={product.id}>
                        <Link to={`product/${product.id}`}>
                            <Product product={product} />
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default MultiProductPage;
