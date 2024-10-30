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
    getFiles: builder.query({
        query: () => `${API_ROUTES.READ_FILE}`
    }),
    trackFile: builder.mutation({
        query: (fileId) => ({
          url:`${API_ROUTES.TRACK_FILE}`,
          method: 'POST',
          body: { fileId },
        }),
      }),
  }),
});

export const { useUploadFileMutation, useGetFilesQuery, useTrackFileMutation } = fileApiSlice;
