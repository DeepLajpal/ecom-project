import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styles from '../styles/SingleProductPage.module.css'

const SingleProductPage = () => {
  let { productId } = useParams();
  const [product, setProduct] = useState([]);
  const getProducts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      console.log(response.data);
      setProduct(response.data)
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
                <img className={styles.mainProductImg} src={product.images} />
              </div>
              <div className={styles.otherProductImgsContainer}>
                <div className={styles.otherProductImgContainer}>
                  <img className={styles.otherProductImg} src={product.images} />
                </div>
                <div className={styles.otherProductImgContainer}>
                  <img className={styles.otherProductImg} src={product.images} />
                </div>
                <div className={styles.otherProductImgContainer}>
                  <img className={styles.otherProductImg} src={product.images} />
                </div>
                <div className={styles.otherProductImgContainer}>
                  <img className={styles.otherProductImg} src={product.images} />
                </div>
              </div>
            </div>
            <div className={styles.productDetails}>
              <p className={styles.productTitle}>{product.title}</p>
              <p className={styles.productPrice}>₹{product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default SingleProductPage