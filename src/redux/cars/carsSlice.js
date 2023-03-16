import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CAR_API_ENDPOINT = 'http://127.0.0.1:3000/api/v1/cars';

const initialState = {
  isFetching: false,
  data: [],
  error: {},
};

const jsonTypeConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
  },
});

const bodyOptions = (formElem) => {
  const data = new FormData(formElem);
  const entries = [...data.entries()];
  const carEntries = entries.slice(0, 3);
  const descEntries = entries.slice(3);

  const body = {
    car: {},
    description: {},
  };

  carEntries.forEach((pair) => {
    const [key, value] = pair;
    body.car[key] = value;
  });

  descEntries.forEach((pair) => {
    const [key, value] = pair;
    body.description[key] = value;
  });

  return body;
};

const filterDeleted = (data, id) => data.filter((carObj) => carObj.id !== parseInt(id, 10));

export const getCars = createAsyncThunk(
  'redux/cars/getCars.js',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(CAR_API_ENDPOINT, jsonTypeConfig());
      return response.data;
    } catch (err) {
      return rejectWithValue({ ...err.response.data });
    }
  },
);

export const addCar = createAsyncThunk(
  'redux/cars/addCar.js',
  async (payload, { rejectWithValue }) => {
    const data = bodyOptions(payload);
    const config = jsonTypeConfig();

    try {
      const response = await axios.post(CAR_API_ENDPOINT, data, config);
      return response.data;
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

export const removeCar = createAsyncThunk(
  'redux/cars/removeCar.js',
  async (payload, { rejectWithValue }) => {
    const config = jsonTypeConfig();

    try {
      const response = await axios.delete(`${CAR_API_ENDPOINT}/${payload}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        return { ...state, isFetching: true, error: {} };
      })
      .addCase(getCars.fulfilled, (state, action) => {
        return { ...state, isFetching: false, data: action.payload, error: {} };
      })
      .addCase(getCars.rejected, (state, action) => {
        return { ...state, isFetching: false, error: action.payload };
      })
      .addCase(addCar.pending, (state) => {
        return { ...state, isFetching: true, error: {} };
      })
      .addCase(addCar.fulfilled, (state, action) => {
        return { ...state, isFetching: false, data: [...state.data, action.payload] };
      })
      .addCase(addCar.rejected, (state, action) => {
        return { ...state, isFetching: false, error: action.payload };
      })
      .addCase(removeCar.pending, (state) => {
        return { ...state, isFetching: true, error: {} };
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        return {
          ...state,
          isFetching: false,
          data: filterDeleted(state.data, action.payload.id),
        };
      })
      .addCase(removeCar.rejected, (state, action) => {
        return { ...state, isFetching: false, error: action.payload };
      });
  },
});

export default carsSlice.reducer;
