import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from '../styles/SingleProductPage.module.css';

const SingleProductPage = () => {
  let { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [selectedImg, setSelectedImg] = useState(product.images);
  const onSelect = (imgSrc) => {
    setSelectedImg(imgSrc);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      console.log(response.data);
      setProduct(response.data)
      console.log(product)
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
                  <p className={styles.productPrice}><span>Price: ₹{product.price - (product.price * (product.discountPercentage / 100)).toFixed(0)}</span></p>
                </div>
                <div className={styles.productPriceYouSaveContainer}>
                  <p className={styles.productPriceYouSave}>You Save: <span className={styles.productPriceYouSaveSpan}>₹{(product.price * (product.discountPercentage / 100)).toFixed(0)} OFF</span></p>
                </div>
                <div className={styles.addToCardContainer} >
                  <Link className={styles.addToCardLink} >
                    <button className={styles.addToCardBtn}>Add to Card</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>

  )
}

export default SingleProductPage