import { API_ROUTES } from '../../constants/ApiConstants';
import { apiSlice } from '../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${API_ROUTES.LOGIN}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
