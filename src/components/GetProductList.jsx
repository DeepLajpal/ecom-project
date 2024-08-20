import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../features/products/productsSlice';
import axios from 'axios';

const GetProductList = () => {

  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      dispatch(setProducts(response.data.products))
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, [])

  return;

};

export default GetProductList;
