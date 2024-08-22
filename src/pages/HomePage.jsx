import useFetchAllProducts from '../hooks/useFetchAllProducts.js'
import MultiProductPage from './MultiProductPage'
const HomePage = () => {
    useFetchAllProducts()
    return (
        <div>
            <MultiProductPage/>
        </div>
    )
}

export default HomePage