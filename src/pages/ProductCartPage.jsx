import axios from 'axios';
import styles from '../styles/ProductCart.module.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSelector';
import QuantitySelector from '../components/QuantitySelector.jsx';


const ProductCartPage = () => {
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTotalSaving, setCartTotalSaving] = useState(0);
  const [cartTotalItems, setCartTotalItems] = useState(0);
  // const [products, setProducts] = useState([]);
  const [cartProductsData, setCartProductsData] = useState([]);
  const cartProducts = useSelector(selectCartItems)
  console.log("cartProducts",cartProducts)
  const updateCartTotal = (productsData) => {
    const newCartSubtotal = productsData.reduce((totalCartValue, currentProduct) => {
      const productPriceAfterDiscount = (currentProduct.price - ((currentProduct.price * currentProduct.discountPercentage) / 100)) * currentProduct.productTotalQuantity;
      return totalCartValue + productPriceAfterDiscount;
    }, 0)

    const newCartSavingTotal = productsData.reduce((totalCartSavingTotal, currentProduct) => {
      const currentProductSaving = (currentProduct.price - (currentProduct.price - (currentProduct.price * currentProduct.discountPercentage) / 100)) * currentProduct.productTotalQuantity;
      return totalCartSavingTotal + currentProductSaving;
    }, 0)

    const newCartTotalItems = productsData.reduce((totalCartItems, currentProduct) => {
      const currentProductTotalQuantity = currentProduct.productTotalQuantity;
      return totalCartItems + currentProductTotalQuantity;
    }, 0)

    setCartSubtotal(newCartSubtotal.toFixed(2));
    setCartTotalSaving(newCartSavingTotal.toFixed(2));
    setCartTotalItems(newCartTotalItems)
  }

  const onDecrease = (product) => {
    const cartProductsDataTemp = cartProductsData.map((cartProduct) => {

      return (cartProduct.id === product.id && cartProduct.productTotalQuantity !== 1 && cartProduct.productTotalQuantity <= cartProduct.stock) ?
        {
          ...cartProduct, productSubtotal: (cartProduct.price * (cartProduct.productTotalQuantity - 1)).toFixed(2),
          productTotalQuantity: cartProduct.productTotalQuantity - 1,
          productTotalSaving: ((cartProduct.price * (cartProduct.productTotalQuantity - 1)) - ((cartProduct.price * (cartProduct.productTotalQuantity - 1)) - (((cartProduct.price * (cartProduct.productTotalQuantity - 1)) * cartProduct.discountPercentage) / 100))).toFixed(2)
        }
        : cartProduct;
    });

    setCartProductsData(cartProductsDataTemp)
    console.log("minus clicked", cartProductsDataTemp)
    updateCartTotal(cartProductsDataTemp);
  }
  const onIncrease = (product) => {
    const cartProductsDataTemp = cartProductsData.map((cartProduct) => {
      return (cartProduct.id === product.id && cartProduct.productTotalQuantity >= 1 && cartProduct.productTotalQuantity < cartProduct.stock) ?
        {
          ...cartProduct, productSubtotal: (cartProduct.price * (cartProduct.productTotalQuantity + 1)).toFixed(2),
          productTotalQuantity: cartProduct.productTotalQuantity + 1,
          productTotalSaving: ((cartProduct.price * (cartProduct.productTotalQuantity + 1)) - ((cartProduct.price * (cartProduct.productTotalQuantity + 1)) - (((cartProduct.price * (cartProduct.productTotalQuantity + 1)) * cartProduct.discountPercentage) / 100))).toFixed(2)
        }
        : cartProduct;
    });


    setCartProductsData(cartProductsDataTemp)
    console.log("minus clicked", cartProductsDataTemp)
    updateCartTotal(cartProductsDataTemp);

  }

  const getProducts = async () => {
    try {
      const productsData = await Promise.all(cartProducts.map(async (item) => {
        const response = await axios.get(`https://dummyjson.com/products/${item.productId}`);
        const product = response.data;
        return {
          ...product,
          productTotalQuantity: 1,
          productSubtotal: (product.price.toFixed(2)),
          productTotalSaving: (product.price - (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)
        };
      })
      );
      setCartProductsData(productsData);

      updateCartTotal(productsData);
      // console.log(productsData);

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

              {cartProductsData.map((product) => {

                return (<div key={product.id} className={styles.cartProductsTableDataContainer}>

                  <div className={styles.cartProductsTableDataContent}>

                    <div className={styles.leftSideContainer}>
                      <div className={styles.leftSideContent}>

                        <div className={styles.leftSide}>
                          <img className={styles.productImg} src={product.images[0]} alt="" />
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
                    
                    <QuantitySelector onDecrease={onDecrease} onIncrease={onIncrease} product={product}/>

                    <div className={styles.rightSideContainer}>
                      <div className={styles.productPriceContainer}>
                        <span className={styles.productActualPrice}> ₹{product.productSubtotal}</span>
                        <span className={styles.productSavingPrice}>Saved: <span className={styles.savingAmt}>₹{product.productTotalSaving}</span></span>
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