import axios from 'axios';
import Header from '../components/Header'
import styles from '../styles/ProductCart.module.scss'
import { useEffect, useState } from 'react';

const ProductCartPage = () => {
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTotalSaving, setCartTotalSaving] = useState(0);
  const [cartTotalItems, setCartTotalItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [quantityTotal, setQuantityTotal] = useState(1);
  const productsId = [1, 2, 3, 4, 5, 6];

  const getProducts = async () => {
    try {
      const productsData = await Promise.all(productsId.map(async (productId) => {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        return response.data;
      })
      );
      setProducts(productsData);

      const newCartSubtotal = productsData.reduce((totalCartValue, currentProduct) => {
        const productPriceAfterDiscount = (currentProduct.price - ((currentProduct.price * currentProduct.discountPercentage) / 100)) * quantityTotal;
        return totalCartValue + productPriceAfterDiscount;
      }, 0)

      const newCartSavingTotal = productsData.reduce((totalCartSavingTotal, currentProduct) => {
        const currentProductSaving = (currentProduct.price - (currentProduct.price - (currentProduct.price * currentProduct.discountPercentage) / 100)) * quantityTotal;
        return totalCartSavingTotal + currentProductSaving;
      }, 0)

      setCartSubtotal(newCartSubtotal.toFixed(2));
      setCartTotalSaving(newCartSavingTotal.toFixed(2));
      setCartTotalItems(productsData.length)
      console.log(productsData);

    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts();
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

              {products.map((product) => {

                return (<div key={product.id} className={styles.cartProductsTableDataContainer}>

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
                            <span className={styles.productSavingPrice}>₹{product.price}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className={styles.middleContainer}>
                      <div className={styles.middleContent}>

                        <div className={styles.quantityControllerContainer}>
                          <div onClick={() => {
                            quantityTotal <= 1 ? quantityTotal : setQuantityTotal(quantityTotal - 1);
                            setCartSubtotal((cartSubtotal + ((product.price - ((product.price * product.discountPercentage) / 100)) * quantityTotal)).toFixed(2));
                          }
                          } className={styles.minusBtnContainer} >
                            <span className={styles.minusBtn}>-</span>
                          </div>
                          <div className={styles.quantityDisplayAreaContainer}>
                            <p className={styles.quantityDisplayArea}>{quantityTotal}</p>
                          </div>
                          <div onClick={() => {
                            quantityTotal === product.stock ? alert(`You cannot add more than ${product.stock} quantities of this product`) : setQuantityTotal(quantityTotal + 1);
                            setCartSubtotal((cartSubtotal + ((product.price - ((product.price * product.discountPercentage) / 100)) * quantityTotal)).toFixed(2));

                          }}
                            className={styles.plusBtnContainer}>
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
                        <span className={styles.productActualPrice}> ₹{((product.price - (product.price * product.discountPercentage) / 100) * quantityTotal).toFixed(2)}</span>
                        <span className={styles.productSavingPrice}>Saved: <span className={styles.savingAmt}>₹{((product.price - (product.price - (product.price * product.discountPercentage) / 100)) * quantityTotal).toFixed(2)}</span></span>
                      </div>
                    </div>

                  </div>

                </div>)

              })}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ProductCartPage