import { createSlice } from '@reduxjs/toolkit';

export interface TripModel {}

const initialState: TripModel[] = [];

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    createTrip: (state, action) => {
      state = action.payload;
    },
  },
});
