import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewProduct, Product } from 'types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], null>({
      query: () => `products`,
      providesTags: (result) =>
        result
          ? [
              ...result?.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    addProduct: builder.mutation<NewProduct, Partial<Product>>({
      query: (body) => ({
        url: `products`,
        method: 'POST',
        body,
      }),
    }),
    deletePost: builder.mutation<{ id: number }, number>({
      query(id) {
        return {
          url: `products/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useDeletePostMutation,
} = productsApi;
