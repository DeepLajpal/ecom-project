import styles from '../../styles/multiProduct/ProductList.module.scss'
import Product from "../../components/multiProduct/Product";
import { Link } from "react-router-dom";
import { selectProductsItems } from '../../features/products/productsSelector';
import { useSelector } from 'react-redux';
const ProductList = () => {
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

export default ProductList