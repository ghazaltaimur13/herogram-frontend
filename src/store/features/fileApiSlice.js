import { API_ROUTES } from '../../constants/ApiConstants';
import { apiSlice } from '../api/apiSlice';

export const fileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: `${API_ROUTES.UPLOAD_FILE}`,
        method: 'POST',
        body: data
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useUploadFileMutation } = fileApiSlice;
