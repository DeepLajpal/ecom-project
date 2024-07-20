import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Product from "../components/Product";
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
      <div className={styles["single-product-page-container"]}>
        <Product title={product?.title} price={product?.price} images={product?.images} styles={styles}/>
      </div>
    </>

  )
}

export default SingleProductPage