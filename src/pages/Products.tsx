import { useGetAllProductsQuery } from '../services/products/productsApi';
import ProductList from '../containers/product-list/ProductList';
import Loader from '../components/loader/Loader';
import { memo } from 'react';



const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery(null);

    if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: Failed to load</div>;
  }

  return <div> { data && <ProductList products={data} />}</div>;
};

export default memo(Products);
