import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from '../styles/SingleProductPage.module.css';
import { addItem, removeItem } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSelector";

const SingleProductPage = () => {
  let { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [selectedImg, setSelectedImg] = useState(product.images);
  const [quantityTotal, setQuantityTotal] = useState(0);
  const cartProducts = useSelector(selectCartItems)
  // const quantityTotal
  console.log("cartProducts", cartProducts)
  const dispatch = useDispatch();
  const onSelect = (imgSrc) => {
    setSelectedImg(imgSrc);
  };

  const increaseQuantity = () => {
    const cartItem = { productId, increaseBy: 1 };
    dispatch(addItem(cartItem));
  }
  const decreaseQuantity = () => {
    const cartItem = { productId, decreaseBy: 1 };
    const newQuantity = quantityTotal - 1;
    setQuantityTotal(newQuantity);
    dispatch(removeItem(cartItem));
  }

  const onAddToCart = (e) => {
    if (product.stock === 0) {
      alert('Out Of Stock');
    } else if (quantityTotal === product.stock) {
      alert(`You cannot add more than ${product.stock} quantities of this product`);
    } else {
      const newQuantity = quantityTotal + 1;
      setQuantityTotal(newQuantity);
      increaseQuantity();
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      setProduct(response.data)
      console.log("product", response.data)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <>
      <div className={styles.singleProductPageContainer}>
        <div className={styles.productContainer}>
          <div className={styles.productContent}>
            <div className={styles.productImgContainer}>
              <div className={styles.mainProductImgContainer}>
                <img className={styles.mainProductImg} src={selectedImg ?? product?.images?.[0] ?? product.images} /> {/*Using Nullish Coalescing (??)*/}
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
                  <p className={styles.brandNamePara}><span className={styles.brandNameSpan}>{product.brand}</span></p>
                </div>
                <div className={styles.productTitleContainer}>
                  <p className={styles.productTitle}>{product.title}</p>
                </div>
                <div className={styles.productMrpPriceContainer}>
                  <p className={styles.productMrpPrice}>MRP:<span className={styles.productMrpPriceSpan}>₹{product.price}</span></p>
                </div>
                <div className={styles.productPriceContainer}>
                  <p className={styles.productPrice}><span>Price: ₹{product.price - (product.price * (product.discountPercentage / 100)).toFixed(2)}</span></p>
                </div>
                <div className={styles.productPriceYouSaveContainer}>
                  <p className={styles.productPriceYouSave}>You Save: <span className={styles.productPriceYouSaveSpan}>₹{(product.price * (product.discountPercentage / 100)).toFixed(0)} OFF</span></p>
                </div>
                <div className={styles.addToCardContainer} >
                  {quantityTotal == 0 ?
                    <button onClick={(e) => onAddToCart(e)} className={styles.addToCartBtn}>Add to Card</button>
                    :
                    <div className={styles.quantityControllerContainer}>
                      <div onClick={() => decreaseQuantity()} className="minusBtnContainer">
                        <button className={styles.minusBtn}>-</button>
                      </div>
                      <div className={styles.quantityDisplayAreaContainer}>
                        <p className={styles.quantityDisplayArea}>{quantityTotal}</p>
                      </div>
                      <div onClick={() => onAddToCart()} className="plusBtnCotaier">
                        <button className={styles.plusBtn}>+</button>
                      </div>
                    </div>}
                </div>``
              </div>
            </div>
          </div>
        </div>
      </div >
    </>

  )
}

export default SingleProductPage