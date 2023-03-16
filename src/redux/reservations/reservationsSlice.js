import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const RESERVATIONS_API_ENDPOINT = 'http://127.0.0.1:3000/api/v1/users/1/reservations';

const initialState = {
  isFetching: false,
  data: [],
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

export const getReservations = createAsyncThunk(
  'redux/cars/getReservations.js',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(RESERVATIONS_API_ENDPOINT);
      return res.data;
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

export const addReservation = createAsyncThunk(
  'redux/cars/addReservation.js',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(RESERVATIONS_API_ENDPOINT, payload, jsonTypeConfig);
      return res.data;
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

const filterDeleted = (data, id) => {
  data.filter((reservationObj) => reservationObj.id !== parseInt(id, 10));
};

export const cancelReservation = createAsyncThunk(
  'redux/cars/removeReservation.js',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${RESERVATIONS_API_ENDPOINT}/${payload}`, jsonTypeConfig);
      return res.data;
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

export const editReservation = createAsyncThunk(
  'redux/cars/updateReservation.js',
  async (id) => {
    const response = await axios
      .put(`${RESERVATIONS_API_ENDPOINT}/${id}`)
      .catch((error) => error);
    return response.data;
  },
);

const reservationsSlicer = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    expandModal: (state, action) => {
      const reservations = state;
      reservations.utils.openModal = action.payload;
      return reservations;
    },
  },
  extraReducers: {
    [getReservations.pending.type]: (state) => ({ ...state, isFetching: true, error: {} }),
    [getReservations.fulfilled.type]: (state, action) => (
      {
        ...state, isFetching: false, data: action.payload, error: {},
      }),
    [getReservations.rejected.type]: (state, action) => (
      { ...state, isFetching: false, error: action.payload }
    ),
    [getReservations.pending.type]: (state) => (
      { ...state, isFetching: true, error: {} }
    ),
    [addReservation.fulfilled.type]: (state, action) => (
      { ...state, isFetching: false, data: [...state.data, action.payload] }
    ),
    [addReservation.rejected.type]: (state, action) => (
      { ...state, isFetching: false, error: { ...action.payload } }
    ),
    [cancelReservation.pending.type]: (state) => (
      { ...state, isFetching: true, error: {} }
    ),
    [cancelReservation.fulfilled.type]: (state, action) => (
      {
        ...state,
        isFetching: false,
        data: filterDeleted(state.data, action.payload.id),
      }
    ),
    [cancelReservation.rejected.type]: (state, action) => (
      { ...state, isFetching: false, error: { ...action.payload } }
    ),
  },
});

export const { expandModal } = reservationsSlicer.actions;
export default reservationsSlicer.reducer;
