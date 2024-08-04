import axios from 'axios';
import Header from '../components/Header'
import styles from '../styles/ProductCart.module.scss'
import { useEffect, useState } from 'react';

const ProductCartPage = () => {
  const cartSubtotal = 10;
  const cartTotalSaving = 11;
  const cartTotalItems = 50;
  const [product, setProduct] = useState([]);
  const [quantityTotal, setQuantityTotal] = useState(0)


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
                  Subtotal ({cartTotalItems} items): ₹ <span className={styles.cartTotalItems}>{cartSubtotal}</span>
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

                  <div className={styles.leftSideContainer}>
                    <div className={styles.leftSideContent}>

                      <div className={styles.leftSide}>
                        <img className={styles.productImg} src={product.images} alt="" />
                      </div>

                      <div className={styles.rightSide}>
                        <span className={styles.productName}>{product.title}</span>
                        <div className={styles.productPriceContainer}>
                          <span className={styles.productActualPrice}>₹ {(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}</span>
                          <span className={styles.productSavingPrice}>₹{(product.price).toFixed(2)}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className={styles.middleContainer}>
                    <div className={styles.middleContent}>

                      <div className={styles.quantityControllerContainer}>
                        <div onClick={() => quantityTotal <= 1 ? quantityTotal : setQuantityTotal(quantityTotal - 1)} className={styles.minusBtnContainer}>
                          <span className={styles.minusBtn}>-</span>
                        </div>
                        <div className={styles.quantityDisplayAreaContainer}>
                          <p className={styles.quantityDisplayArea}>{quantityTotal}</p>
                        </div>
                        <div onClick={() => quantityTotal === product.stock ? alert(`You cannot add more than ${product.stock} quantities of this product`) : setQuantityTotal(quantityTotal + 1)} className={styles.plusBtnContainer}>
                          <span className={styles.plusBtn}>+</span>
                        </div>
                      </div>

                      <div className={styles.btnContainers}>
                        <span className={styles.deleteBtn}>Delete</span>
                        <span className={styles.separatorBtn}>|</span>
                        <span className={styles.saveForLaterBtn}>Save for later</span>
                      </div>

                    </div>
                  </div>

                  <div className={styles.rightSideContainer}>
                    <div className={styles.productPriceContainer}>
                      <span className={styles.productActualPrice}> ₹{(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}</span>
                      <span className={styles.productSavingPrice}>Saved: <span className={styles.savingAmt}>₹{(product.price - (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}</span></span>
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