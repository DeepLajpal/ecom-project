import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from '../styles/SingleProductPage.module.scss';
import { addItem, removeItem } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSelector";
import useFetchSingleProduct from "../hooks/useFetchSingleProduct";
import QuantitySelector from "../components/QuantitySelector";
import Loader from "../components/Loader";

const SingleProductPage = () => {
  let { productId } = useParams();
  const cartProducts = useSelector(selectCartItems)
  const dispatch = useDispatch();
  const { product, loading, error } = useFetchSingleProduct(productId);
  const [selectedImg, setSelectedImg] = useState(product?.images);
  const cartProduct = cartProducts.find((product) => product.productId === productId)
  const cartProductQuantity = cartProduct?.quantityTotal ?? 0;

  if (error) {
    console.log(error)
  }

  const onSelect = (imgSrc) => {
    setSelectedImg(imgSrc);
  };

  const increaseQuantity = () => {
    const cartItem = { productId, increaseBy: 1, stock: product.stock };
    dispatch(addItem(cartItem));
  }

  const decreaseQuantity = () => {
    const cartItem = { productId, decreaseBy: 1 };
    dispatch(removeItem(cartItem));
  }

  return (
    <>
      {
        loading ?
          <Loader />
          :
          <div className={styles.singleProductPageContainer}>
            <div className={styles.productContainer}>
              <div className={styles.productContent}>
                <div className={styles.productImgContainer}>
                  <div className={styles.mainProductImgContainer}>
                    <img className={styles.mainProductImg} src={selectedImg ?? product?.images?.[0] ?? product?.images} /> {/*Using Nullish Coalescing (??)*/}
                  </div>
                  <div className={styles.otherProductImgsContainer}>
                    {product?.images?.map((imgSrc, index) => {
                      return <div
                        key={index}
                        className={selectedImg === imgSrc ? styles.selectedImgContainer : styles.otherProductImgContainer}
                        onClick={() => onSelect(imgSrc)}
                      >
                        <img className={styles.otherProductImg} src={imgSrc} alt={`Product Thumbnail ${index}`} />
                      </div>
                    })}
                  </div>
                </div>

                <div className={styles.rightContainer}>
                  <div className={styles.rightContent}>
                    <div className={styles.productBrandNameContainer}>
                      <p className={styles.brandNamePara}><span className={styles.brandNameSpan}>{product?.brand}</span></p>
                    </div>
                    <div className={styles.productTitleContainer}>
                      <p className={styles.productTitle}>{product?.title}</p>
                    </div>
                    <div className={styles.productMrpPriceContainer}>
                      <p className={styles.productMrpPrice}>MRP:<span className={styles.productMrpPriceSpan}>₹{product?.price}</span></p>
                    </div>
                    <div className={styles.productPriceContainer}>
                      <p className={styles.productPrice}><span>Price: ₹{product?.price - (product?.price * (product?.discountPercentage / 100)).toFixed(2)}</span></p>
                    </div>
                    <div className={styles.productPriceYouSaveContainer}>
                      <p className={styles.productPriceYouSave}>You Save: <span className={styles.productPriceYouSaveSpan}>₹{(product?.price * (product?.discountPercentage / 100)).toFixed(0)} OFF</span></p>
                    </div>

                    <div className={styles.addToCardContainer} >
                      {cartProductQuantity == 0 ?

                        <button onClick={() => increaseQuantity()} className={styles.addToCartBtn}>Add to Card</button>

                        :

                        <QuantitySelector cartProductQuantity={cartProductQuantity} onDecrease={decreaseQuantity} onIncrease={increaseQuantity} />
                      }

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div >
      }

    </>

  )
}

export default SingleProductPage