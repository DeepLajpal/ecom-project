import styles from '../../styles/multiProduct/ProductList.module.scss'
import Product from "../../components/multiProduct/Product";
import { selectProductsItems } from '../../features/products/productsSelector';
import { useSelector } from 'react-redux';
const ProductList = () => {
    const products = useSelector(selectProductsItems);

    return (
        <div className={styles.multiProductCardContainer}>
            {products?.map((product) => {
                return (
                    <div className={styles.productContainer} key={product.id}>
                            <Product product={product} />
                    </div>
                );
            })}
        </div>
    );
}

export default ProductList