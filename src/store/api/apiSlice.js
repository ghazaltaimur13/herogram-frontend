import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = getState().base;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});
