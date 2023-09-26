import { PayloadAction,  createSlice } from '@reduxjs/toolkit';
import { Product } from 'types';

interface InitialState {
  products: Product[];
}

const initialState: InitialState = {
  products: [],

};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addNewProductsLocal: (state, action:PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
  
  },
  extraReducers: () => { },
});
export const { addNewProductsLocal} = productsSlice.actions;

export default productsSlice.reducer;
