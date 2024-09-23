import { useSelector } from 'react-redux';
import styles from '../../styles/multiProduct/ProductFilters.module.scss'
import DropDown from './DropDown';
import { selectProductsItems } from '../../features/products/productsSelector';
import ActiveFilters from './ActiveFilters';

const ProductFilters = () => {
  const allProductsData = useSelector(selectProductsItems)
  const brandsListOfAllProducts = allProductsData.map((product) => product.brand)
  const categoryListOfAllProducts = allProductsData.map((product) => product.category)
  const uniquebrandsList = [...new Set(brandsListOfAllProducts.filter(item => item !== undefined))];
  const uniqueCategoryList = [...new Set(categoryListOfAllProducts.filter(item => item !== undefined))];

  return (
    <div className={styles.productFiltersContainer}>
      <div className={styles.productFiltersContent}>
        <div className={styles.mainHeadingContainer}>
          <h1 className={styles.mainHeading}>Product Filters</h1>
        </div>
        <div className={styles.filtersContainer}>
          <div className={styles.filtersContent}>
            {/* <ActiveFilters list={uniqueCategoryList}/> */}
            <DropDown heading="Shop by category" list={uniqueCategoryList} />
            <DropDown heading="Brand" list={uniquebrandsList} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters 