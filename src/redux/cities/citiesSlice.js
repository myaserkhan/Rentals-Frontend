import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CITIES_API_ENDPOINT = 'https://countriesnow.space/api/v0.1/countries/cities';

const initialState = {
  isFetching: false,
  cities: [],
  error: {},
  utils: {
    openModal: false,
  },
};

const jsonTypeConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getCities = createAsyncThunk(
  'redux/cars/cities.js',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(CITIES_API_ENDPOINT, payload, jsonTypeConfig);
      return res.data;
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

const citiesSlicer = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    expandModal: (state, action) => {
      const reservations = state;
      reservations.utils.openModal = action.payload;
      return reservations;
    },
  },
  extraReducers: {
    [getCities.pending.type]: (state) => ({ ...state, isFetching: true, error: {} }),
    [getCities.fulfilled.type]: (state, action) => (
      {
        ...state, isFetching: false, cities: action.payload, error: {},
      }),
    [getCities.rejected.type]: (state, action) => (
      { ...state, isFetching: false, error: action.payload }
    ),
    [getCities.pending.type]: (state) => (
      { ...state, isFetching: true, error: {} }
    ),
    [getCities.fulfilled.type]: (state, action) => (
      { ...state, isFetching: false, cities: [...state.cities, action.payload] }
    ),
    [getCities.rejected.type]: (state, action) => (
      { ...state, isFetching: false, error: { ...action.payload } }
    ),
  },
});

export default citiesSlicer.reducer;
