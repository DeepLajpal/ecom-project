import { FaShoppingBasket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="text-center">
          <FaShoppingBasket className="mx-auto h-16 w-16 text-gray-400" aria-hidden="true" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-600">
            Looks like you haven't added any items to your cart yet.
          </p>
        </div>
        <div className="mt-8">
          <Link to="/" className="bg-custom-gradient group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaShoppingBasket className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;