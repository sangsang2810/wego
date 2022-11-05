import { createSlice } from '@reduxjs/toolkit';
import { TripModel } from 'models';

const initialState: TripModel[] = [];

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    createTrip: (state, action) => {
      const tripData = action.payload;
      state.push(tripData);
      return state;
    },
  },
});

export const { createTrip } = tripSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default tripSlice.reducer;
