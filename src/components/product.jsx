
const Product = ({title, price, images}) => {
    return (
        <div className="product-content">
            <div className="product-img" style={{ height: '100px', width: '100px' }}>
                <img style={{ height: '100%', width: '100%' }} src={images[0]} />
            </div>
            <div className="product-details">
                <p>{title}</p>
                <p>₹{price}</p>
            </div>
        </div>
    )
}

export default Product ;