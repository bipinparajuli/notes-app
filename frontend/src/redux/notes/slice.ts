import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { url } from './const';
import { INoteResponse, ICreateNote, IUpdateNote } from './notes.interface';

export const notesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem('token') || '');
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'note',
  tagTypes: ['notes', 'note'],
  endpoints: (build) => ({
    postNote: build.mutation<INoteResponse, ICreateNote>({
      query: (post) => ({
        url: url.note,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [{ type: 'notes', id: 'notes' }],
    }),
    listNote: build.query<INoteResponse[], void>({
      query: () => {
        return {
          url: url.note,
          method: 'GET',
        };
      },
      providesTags: [{ type: 'notes', id: 'notes' }],
    }),
    getNote: build.query<INoteResponse, number>({
      query: (id) => {
        return {
          url: `${url.note}/${id}`,
          method: 'GET',
        };
      },
      providesTags: [{ type: 'notes', id: 'notes' }],
    }),
    updateNote: build.mutation<INoteResponse, IUpdateNote>({
      query: (body) => ({
        url: `${url.note}/${body.id}`,
        method: 'PUT',
        body: {
          title: body.title,
          content: body.content,
        },
      }),
      invalidatesTags: [
        { type: 'notes', id: 'notes' },
        { type: 'notes', id: 'notes' },
      ],
    }),
    deleteNote: build.mutation<INoteResponse, number>({
      query: (id) => ({
        url: `${url.note}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'notes', id: 'notes' }],
    }),
  }),
});

export const {
  useDeleteNoteMutation,
  usePostNoteMutation,
  useUpdateNoteMutation,
  useListNoteQuery,
  useGetNoteQuery,
} = notesApi;
