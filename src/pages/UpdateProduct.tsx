import Loader from '../components/loader/Loader';
import ProductForm from '../components/product-form/ProductForm';
import { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery, useUpdateProductMutation } from 'services/products/productsApi';
import { Product } from 'types';

const UpdateProduct = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id || '1');
  const [updateProduct, result] = useUpdateProductMutation();

  const [product, setProduct] = useState<Product>();

  const location = useLocation();

  useEffect(() => {
    if (data) {
      setProduct(data);
    } else {
      setProduct(location.state); // for get the local created product
    }
  }, []);

  const navigate = useNavigate();



  useEffect(() => {
    if (result.isSuccess) {
      navigate(`/product/${id}`);
    }
  }, [result.isSuccess]);

  const update = () => {
    console.log({ ...product }, 'product');
    if(product){
       updateProduct({  ...product,id: Number(id),});
    }
   
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

     {product && <ProductForm product={product} onChange={setProduct} submit={update} action='UPDATE' />}
    </div>
  );
};

export default memo(UpdateProduct);
