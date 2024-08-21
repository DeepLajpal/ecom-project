import useLoadLatestProducts from '../Custom_Hooks/useLoadLatestProducts.js'
import MultiProductPage from './MultiProductPage'
const HomePage = () => {
    useLoadLatestProducts()
    return (
        <div>
            <MultiProductPage/>
        </div>
    )
}

export default HomePage