import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TripModel } from 'models';
import { TimeLineService } from '../../services';

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

// selector

const selectLocationsByTripId = (state: RootState, tripId: string) => {
  return state.trips[tripId];
};

const configRouteByTripId = (state: RootState, tripId: string) => {
  const locations = state.trips.find((trip) => (trip.id = tripId))?.locations;
  const timeline = TimeLineService.configRoutes(locations);
  return timeline;
};

export { configRouteByTripId };
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default tripSlice.reducer;
