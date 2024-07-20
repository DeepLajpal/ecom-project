import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import styles from '../styles/MultiProductPage.module.css';

const MultiProductPage = () => {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products');
            console.log(response.data.products);
            setProducts(response.data.products)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <h1>Multi Product page</h1>
            <div className={styles["multi-product-card-container"]}>
                {products?.map((product) => {
                    return (
                        <div className={styles["product-container"]} key={product.id}>
                            <Link to={`product/${product.id}`}>
                                <Product title={product.title} price={product.price} images={product.images[0]} styles={styles}/>
                            </Link>
                        </div>
                    )
                }
                )}
            </div>
        </>
    )
}

export default MultiProductPage