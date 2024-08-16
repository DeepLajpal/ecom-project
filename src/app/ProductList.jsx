import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../features/products/productsSlice';
import { selectProductsItems } from '../features/products/productsSelector';
import axios from 'axios';

const ProductList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectProductsItems);
  //   const status = useSelector(selectProductsStatus);
  //   const error = useSelector(selectProductsError);

  const getProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      // console.log(response.data.products);
      dispatch(setProducts(response.data.products))
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, [])

  //   if (status === 'loading') return <p>Loading...</p>;
  //   if (status === 'failed') return <p>Error: {error}</p>;

  return ;
  // return (
    // <ul>
    //   {items.map(product => {
    //     console.log(product.title)
    //     return <li key={product.id}>{product.title}</li>
    //   }
    //   )}
    // </ul>
    
  // );
};

export default ProductList;
