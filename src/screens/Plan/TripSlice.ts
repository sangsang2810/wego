import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export type TripModel = {
  banner: string;
  name: string;
  leader: string;
  linkInvite: string;
  deposit: string;
  locations: TimeLineModel[];
  transport: {
    vehicle: 'motorBike' | 'flight' | 'bus';
    start: {
      date: Date;
      from: Date;
      to: Date;
    };
    end: {
      date: Date;
      from: Date;
      to: Date;
    };
  };
};

export type TimeLineModel = {
  time: Date;
  date: Date;
  title: string;
  address: string;
  note: string;
};

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
