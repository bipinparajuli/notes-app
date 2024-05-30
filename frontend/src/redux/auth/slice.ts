import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { url } from './const';
import { IRegister } from './auth.interface';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  tagTypes: ['auth'],
  endpoints: (build) => ({
    register: build.mutation<any, IRegister>({
      query: (post) => ({
        url: url.register,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [{ type: 'auth', id: 'register' }],
    }),
    login: build.mutation<any, IRegister>({
      query: (post) => ({
        url: url.login,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [{ type: 'auth', id: 'login' }],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
