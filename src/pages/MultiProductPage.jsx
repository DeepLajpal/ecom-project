import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

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
                    console.log(product.title);
                    return (
                        <div className="product-container" key={product.id}>
                            <div className="product-img" style={{ height: '100px', width: '100px' }}>
                                <img style={{ height: '100%', width: '100%' }} src={product.images[0]} />
                            </div>
                            <div className="product-details">
                                <p>{product.title}</p>
                                <p>₹{product.price}</p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </>

    )

}

export default MultiProductPage