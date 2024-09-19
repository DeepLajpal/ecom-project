import ProductFilters from '../components/multiProduct/ProductFilters.jsx';
import ProductList from '../components/multiProduct/ProductList';
import styles from '../styles/multiProduct/MultiProductPage.module.scss';

const MultiProductPage = () => {
  return (
    <div className={styles.multiProductPageContainer}>
        <div className={styles.multiProductPageContent}>
            <div className={styles.productFilters}>
                <ProductFilters/>
            </div>
            <div className={styles.productList}>
                <ProductList/>
            </div>
        </div>
    </div>
  )
}

export default MultiProductPage
