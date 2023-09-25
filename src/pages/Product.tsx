import ProductDetail from '../components/product-detail/ProductDetail';
import { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from 'types';
import { useDeletePostMutation, useGetProductByIdQuery } from '../services/products/productsApi';
import Loader from '../components/loader/Loader';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProductByIdQuery(id || '1');
  const [deletePost, result] = useDeletePostMutation();

  useEffect(()=>{
  if (result.status === 'fulfilled') {
      navigate('/');
    }
  },[result.status])
  const handleDeleteProduct = () => {
    deletePost(Number(id));
  
  };
  if (isLoading || result.isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: Failed to load</div>;
  }

  return <div>{data && <ProductDetail product={data} onDelete={handleDeleteProduct} />}</div>;
};

export default memo(Product);
