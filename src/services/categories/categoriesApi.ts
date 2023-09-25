
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/products/' }),
  endpoints: (builder) => ({
     getCategories: builder.query<string[],null>({
      query: () => `categories`,
    }),
  }),
});

export const { useGetCategoriesQuery} = categoriesApi;
