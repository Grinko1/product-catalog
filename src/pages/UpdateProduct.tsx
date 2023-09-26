import Loader from '../components/loader/Loader';
import ProductForm from '../components/product-form/ProductForm';
import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery, useUpdateProductMutation } from 'services/products/productsApi';
import { Product } from 'types';


const UpdateProduct = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id || '1');
  const [updateProduct, result] = useUpdateProductMutation();


 
  const [product, setProduct] = useState<Partial<Product> | undefined>(data);
  console.log(product);
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(data);
  }, [data]);

  useEffect(() => {
    if (result.isSuccess) {
      navigate(`/product/${id}`);
    }
  }, [result.isSuccess]);

  const update = () => {
    updateProduct({ id: Number(id), ...product });
  

  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: Failed to load</div>;
  }
  return (
    <div>
      <h3>Update product ID-{id}</h3>

      <ProductForm product={product} onChange={setProduct} submit={update} action='UPDATE' />
    </div>
  );
};

export default memo(UpdateProduct);
