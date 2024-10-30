import { createSlice } from '@reduxjs/toolkit';

const initialState = Object.freeze({
  accessToken: null,
});

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const {
  setAccessToken,
} = baseSlice.actions;

// Selectors
export const selectAccessToken = (state) => state.base.accessToken;
export const selectIsAuthenticated = (state) => state.base.accessToken !== null;

export default baseSlice.reducer;
