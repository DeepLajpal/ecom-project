import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import styles from '../styles/SingleProductPage.module.css'

const SingleProductPage = () => {
  let { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [selected, setSelected] = useState(true);

  const onSelect = (element)=>{
    console.log("Hello World, the Selected Value is currently: ", selected);
    setSelected(!selected);
    element.target.style.border = "2px solid #648628"
    console.dir(element.target.parentElement.className);
  }
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
                <div onClick={(element) => onSelect(element)} className={styles.otherProductImgContainer1}>
                  <img className={styles.otherProductImg} src={product.images} />
                </div>
                <div onClick={(element) => onSelect(element)} className={styles.otherProductImgContainer2}>
                  <img className={styles.otherProductImg} src={product.images} />
                </div>
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