import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from '../styles/SingleProductPage.module.scss';
import { addItem, decreaseItem, removeItem } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSelector";
import useFetchSingleProduct from "../hooks/useFetchSingleProduct";
import QuantitySelector from "../components/QuantitySelector";
import Loader from "../components/Loader";

const SingleProductPage = () => {
  const dispatch = useDispatch();
  let { productId } = useParams(); //useParams values are string by default
  productId = Number(productId) // string to number

  const { product, loading, error } = useFetchSingleProduct(productId);
  const [selectedImg, setSelectedImg] = useState(product?.images);
  const cartProducts = useSelector(selectCartItems);
  console.log("cartProducts", cartProducts)
  const existingProduct = cartProducts?.find((product) => {
    
    console.log("product.productid",typeof(product.productId))
    console.log("productid",typeof(productId))
    return product.productId === productId
  })
  console.log("existingProduct", existingProduct)
  const existingProductQuantity = existingProduct?.productQuantity ?? 0;

  console.log("existingProductQuantity", existingProductQuantity)
  console.log(product)

  const onSelect = (imgSrc) => {
    setSelectedImg(imgSrc);
  };

  const increaseQuantity = () => {
    const cartItemPayload = { product, increaseBy: 1, stock: product.stock };
    dispatch(addItem(cartItemPayload));
    console.log("increase clicked")
  }

  const decreaseQuantity = () => {
    const cartItemPayload = { product, decreaseBy: 1 };
    dispatch(decreaseItem(cartItemPayload));
    console.log("decrease clicked")
  }

  const deleteItem =()=> {
    const cartItemPayload = { productId };
    dispatch(removeItem(cartItemPayload));
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
                      {existingProductQuantity == 0 ?

                        <button onClick={() => increaseQuantity()} className={styles.addToCartBtn}>Add to Card</button>

                        :

                        <QuantitySelector existingProduct={existingProduct} onDecrease={decreaseQuantity} onIncrease={increaseQuantity}/>
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