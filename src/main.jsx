import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from './pages/ErrorPage.jsx';
import SingleProductPage from './pages/SingleProductPage.jsx';
import ProductCartPage from './pages/ProductCartPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "product/:productId",
    element: <SingleProductPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "cart/:cartId",
    element: <ProductCartPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
