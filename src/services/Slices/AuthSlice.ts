import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TripModel, UserModel } from 'models';
import axiosClient from '../axiosClient';

interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: UserModel;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: null,
};

export const handleLogin = createAsyncThunk('login', async (body) => {
  try {
    await axiosClient.post('/api/user/login', {}).then((res) => {
      console.log('res', res);
    });
  } catch (error) {
    console.log('Không ổn r đại vương ơi:', error);
  }
});

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

// selector
// const selectLocationsByTripId = (state: RootState, tripId: string) => {
//   return state.trips[tripId];
// };
// export { selectLocationsByTripId };

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer;
