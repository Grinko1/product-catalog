import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  Product } from 'types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], null>({
      query: () => `products`,
      providesTags: ['Products'],
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (data ) => ({
        url: `products/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        console.log(args)
        try {
          const { data: updatedProduct } = await queryFulfilled;
          const id = args!.id!.toString()
          dispatch(

            productsApi.util.updateQueryData('getProductById', id, (draft) => {
              return Object.assign(draft, args);
            }),
          );
          dispatch(
            productsApi.util.updateQueryData('getAllProducts', null, (draft) => {
              console.log(updatedProduct, 'updatedProduct');
              return draft.map((item) => {
                if (item.id === args.id) {
                  return args;
                }
                return item;
              });
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (data) => ({
        url: `products`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: createdProject } = await queryFulfilled;
          dispatch(
            productsApi.util.updateQueryData('getAllProducts', null, (draft) => {
              draft?.push(createdProject);
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deletePost: builder.mutation<{ id: number }, number>({
      query(id) {
        return {
          url: `products/${id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            productsApi.util.updateQueryData('getAllProducts', null, (draft) => {
              return draft.filter((project) => project.id !== args);
            }),
          );
        } catch (error) {
          console.log(error);
        }
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
