import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Product from "../components/product";

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
            <div className="multi-product-card-container" style={{
                display:"grid",
                gridTemplateColumns: "200px 200px",
                gridTemplateRows: "200px 200px",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "center",
            }}>
                {products?.map((product) => {
                    return (
                        <div className="product-container" key={product.id}>
                            <Product title={product.title} price={product.price} images={product.images}/>
                        </div>
                    )
                }
                )}
            </div>
        </>
    )
}

export default MultiProductPage