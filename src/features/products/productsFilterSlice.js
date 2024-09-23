import { createSlice } from "@reduxjs/toolkit";
// import { selectProductsItems } from "./productsSelector";
// import { useSelector } from "react-redux";

const filterStates = {
    activeFilters:[],
    filteredProducts:[]
}
// const products = useSelector(selectProductsItems);
const productsFilterSlice = createSlice(
    { 
        name: "productsFilter",
        initialState:filterStates,
        reducers:{
            updateFilter:(state, action)=>{
                state.activeFilters.push(action.payload)
            },
            removeActiveFilter: (state, action)=>{
                state.activeFilters.filter((filter)=>action.payload !== filter)
            },
            setFilteredProducts:(state, action)=>{
                // state.filteredProducts.filter((filter)=>action.payload)
            }
        }

    }
);

// export {updateFilter, removeActiveFilter, setFilteredProducts} = productsFilterSlice.actions;
// export default productsFilterSlice = productsFilterSlice.reducer;
