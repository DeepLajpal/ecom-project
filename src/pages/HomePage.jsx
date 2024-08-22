import useFetchAllProducts from '../Custom_Hooks/useFetchAllProducts.js'
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