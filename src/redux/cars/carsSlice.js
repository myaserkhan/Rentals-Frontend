import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import data from './helpers/data';

const CAR_API_ENDPOINT = 'https://something/api/v1/:user_id/cars';

const initialState = {
  isFetching: false,
  data: [...data],
  error: {},
};

export const getCars = createAsyncThunk(
  'redux/cars/getCars.js',
  async () => {
    const response = await axios.get(CAR_API_ENDPOINT).catch((error) => error);
    return response.data;
  },
);

export const addCar = createAsyncThunk(
  'redux/cars/addCar.js',
  async () => {
    // should be like this axios.post(CAR_API_ENDPOINT, addCarParams, addCarHeaders)
    const response = await axios.post(CAR_API_ENDPOINT)
      .catch((error) => error);
    return response.data;
  },
);

const deleteOptions = {
  headers: {
    something: '',
  },
};

export const removeCar = createAsyncThunk(
  'redux/cars/removeCar.js',
  async (id) => {
    const response = await axios
      .delete(`${CAR_API_ENDPOINT}/${id}`, deleteOptions)
      .catch((error) => error);
    return response.data;
  },
);

const carsSlicer = createSlice({
  name: 'cars',
  initialState,
  reducers: {
  },
});

export default carsSlicer.reducer;
