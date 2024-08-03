import axios from 'axios';
import Header from '../components/Header'
import styles from '../styles/ProductCart.module.scss'
import { useEffect, useState } from 'react';

const ProductCartPage = () => {
  const cartSubtotal = 10;
  const cartTotalSaving = 11;
  const cartTotalItems = 50;
  const [product, setProduct] = useState([]); 

  const getProduct = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${2}`);
      setProduct(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, [])

  return (
    <>
      <Header />
      <div className={styles.productCartContainer}>
        <div className={styles.productCartContent}>

          <div className={styles.cartHeadingContainer}>
            <h1 className={styles.cartHeading}>Your Cart</h1>
          </div>

          <div className={styles.productCartSubtotalAndCheckoutBtnContainer}>
            <div className={styles.productCartSubtotalAndCheckoutBtnContent}>

              <div className={styles.subtotalContainer}>
                <div className={styles.cartSubtotal}>
                  Subtotal ({cartTotalItems} items): ₹ {cartSubtotal}
                </div>
                <div className={styles.savingTotal}>
                  Savings: ₹ <span className={styles.savingTotalAmt}>{cartTotalSaving}</span>
                </div>
              </div>

              <div className={styles.checkoutBtnContainer}>
                <div className={styles.checkoutBtnContent}>
                  <button className={styles.checkoutBtn}>Checkout</button>
                </div>
              </div>

            </div>
          </div>

          <div className={styles.cartProductsTableContainer}>
            <div className={styles.cartProductsTableContent}>

              <div className={styles.cartProductsTableHeaderContainer}>
                <div className={styles.cartProductsTableHeaderContent}>
                  <span className={styles.productDetails}>Items ({cartTotalItems} items)</span>
                  <span className={styles.productQuantity}>Quantity</span>
                  <span className={styles.productSubtotal}>Sub-total</span>
                </div>
              </div>

              <div className={styles.cartProductsTableDataContainer}>

                <div className={styles.cartProductsTableDataContent}>
                  <div className={styles.cartProductsDetailsContainer}>

                    <div className={styles.leftSideContainer}>

                      <div className={styles.leftSideContent}>
                        <div className={styles.productImgContainer}><img className={styles.productImg} src={product.images} alt="" /></div>
                      </div>

                      <div className={styles.rightSideContent}>
                        <span className={styles.productName}>{product.title}</span>
                        <span className={styles.productPrice}>Rs: {product.price}</span>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ProductCartPage