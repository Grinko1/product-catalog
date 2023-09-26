import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './ProductForm.module.scss';
import { memo } from 'react';
import { NewProduct, Product } from 'types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetCategoriesQuery } from '../../services/categories/categoriesApi';

export interface IFormInput {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  count:number
}

interface ProductFormProps {
  product?: NewProduct;
  onChange: (value: NewProduct | Product) => void;
  submit: () => void;
  action: string;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number().min(0.1).required(),
  description: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().required(),
  count: yup.number().min(1).required()
});

const ProductForm = (props: ProductFormProps) => {
  const { product, onChange, submit, action } = props;
  const { data, error, isLoading } = useGetCategoriesQuery(null);
console.log(product,'product')
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = () => {
    submit();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof IFormInput;
    const fieldValue = e.target.value;

    const fieldError = errors[fieldName]?.message || '';
    onChange({ ...product, [fieldName]: fieldValue });
  };

  const changePriceInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
      let inputValue = e.target.value;
    // const numericValue = inputValue.replace(/^\d*\,?\d*$/, '');
    // onChange({ ...product, price: Number(numericValue) });
     onChange({ ...product, price: Number(inputValue) });
  }
  const handleCountInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
    let inputValue = e.target.value;
    const updatedProduct = {...product}
     updatedProduct!.rating!.count = parseInt(inputValue, 10);
    onChange(updatedProduct)
  }
  if (error) {
    return <div>Error: Failed to create new product</div>;
  }
  return (
    <div>
      <form className={style.ProductForm} onSubmit={handleSubmit(onSubmit)}>
        <label>Image link</label>
        <input
          {...register('image')}
          aria-invalid={!!errors.image}
          placeholder='Image link'
          name='image'
          value={product?.image}
          onChange={handleInputChange}
        />
        <span className={style.FormError} role='alert'>
          {errors.image?.message && '*' + errors.image.message}
        </span>

        <label>Title</label>
        <input
          {...register('title')}
          aria-invalid={!!errors.title}
          placeholder='Title'
          name='title'
          value={product?.title}
          onChange={handleInputChange}
        />
        <span className={style.FormError} role='alert'>
          {errors.title?.message && '*' + errors.title.message}
        </span>

        <label>Description</label>
        <input
          {...register('description')}
          aria-invalid={!!errors.description}
          placeholder='Description'
          name='description'
          value={product?.description}
          onChange={handleInputChange}
        />
        <span className={style.FormError} role='alert'>
          {errors.description?.message && '*' + errors.description.message}
        </span>

        <label>Price</label>
        <input
          {...register('price')}
          type='number'
          name='price'
          placeholder='Price'
           step="0.01"
          aria-invalid={!!errors.price}
          value={product?.price}
          onChange={changePriceInput}
        />
        <span className={style.FormError} role='alert'>
          {errors.price?.message && '*' + `${errors.price?.message}`}
        </span>
        <label>Count in stock</label>
        <input
          {...register('count')}
          type='number'
          name='count'
          placeholder='Count'
           step="1"
          aria-invalid={!!errors.count}
          value={product?.rating?.count}
          onChange={handleCountInput}
        />
        <span className={style.FormError} role='alert'>
          {errors.count?.message && '*' + `${errors.count?.message}`}
        </span>
        <label>Category</label>
        <select
          value={product?.category || ''}
          {...register('category')}
          onChange={(e) =>
            onChange({ ...product, category: (e.target as HTMLSelectElement).value })
          }>
   
          {!isLoading &&
            data!.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
        <span className={style.FormError} role='alert'>
          {errors.category?.message && '*' + `${errors.category?.message}`}
        </span>
        <button>{action}</button>
      </form>
    </div>
  );
};

export default memo(ProductForm);
