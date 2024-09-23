import { useState } from 'react';
// import { removeActiveFilter } from '../../features/products/productsFilterSlice';
// import { useDispatch } from 'react-redux';

const ActiveFilters = ({list}) => {
  const [filters, setFilters] = useState([...list]);
  // const activeFilters = useSelectors = ()
  // const dispatch = useDispatch();


  const removeFilter = (filterToRemove) => {
    setFilters(filters.filter(filter => filter !== filterToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 rounded-lg border">
      {filters.map((filter, index) => (
        <div key={index} className="flex items-center bg-gray-200 rounded-lg px-4 py-2 space-x-2">
          <span className="text-gray-700">{filter}</span>
          <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() => removeFilter(filter)}
          >
            &#x2716;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
