import ProductFilters from '../components/multiProduct/ProductFilters.jsx';
import ProductList from '../components/multiProduct/ProductList';
import styles from '../styles/multiProduct/MultiProductPage.module.scss';

const MultiProductPage = () => {
  return (
    <div className={styles.multiProductPageContainer}>
        <div className={styles.multiProductPageContent}>
            <ProductFilters/>
            <ProductList/>
        </div>
    </div>
  )
}

export default MultiProductPage
