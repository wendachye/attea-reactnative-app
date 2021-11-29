import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';

const name = 'stamps';

const initialState = {
  loading: false,
  title: '',
  totalStamps: 0,
  data: [],
};

export const fetchStamps = createRoutine(`${name}/fetchStamps`);
export const clearStamps = createRoutine(`${name}/clearStamps`);

const isRequestAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

const isFullfillAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};

export const stampSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchStamps.SUCCESS, (state, action) => {
        const {stamp} = action.payload;

        state.title = stamp.title;
        state.totalStamps = stamp.totalStamps;
        state.data = stamp.data;
      })
      .addCase(clearStamps.SUCCESS, (state, action) => {
        state.title = '';
        state.totalStamps = 0;
        state.data = [];
      })
      .addMatcher(isRequestAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isFullfillAction, (state, action) => {
        state.loading = false;
      });
  },
});

export default stampSlice.reducer;
