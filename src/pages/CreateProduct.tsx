import ProductForm from '../components/product-form/ProductForm';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from 'services/categories/categoriesApi';
import { useAddProductMutation } from 'services/products/productsApi';
import { Product } from 'types';
import generateUniqId from 'utills/generateUniqId';

const uniqId = generateUniqId(20); // fn for generate uniq id

const CreateProduct = () => {
  const { data, error, isLoading } = useGetCategoriesQuery(null);
  const [product, setProduct] = useState<Product>({
    id: uniqId(),
    title: '',
    description: '',
    price: null,
    image: '',
    category: '',
    rating: {
      count: 0,
      rate: 0,
    },
  });

  useEffect(() => {
    if (data) {
      setProduct({ ...product, category: data[0] });
    }
  }, [data]);
  const navigate = useNavigate();
  const [addProduct, result] = useAddProductMutation();

  useEffect(() => {
    if (result.isSuccess) {
      navigate(`/`);
    }
  }, [result.isSuccess]);

  const create = () => {
    addProduct(product);
  };

  return (
    <div>
      <h3>Create new product</h3>
      <ProductForm product={product} onChange={setProduct} submit={create} action='CREATE' />
    </div>
  );
};

export default memo(CreateProduct);
