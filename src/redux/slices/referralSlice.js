import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';

const name = 'referrals';

const initialState = {
  loading: false,
  referrals: [],
};

export const fetchReferrals = createRoutine(`${name}/fetchReferrals`);
export const clearReferrals = createRoutine(`${name}/clearReferrals`);

const isRequestAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

const isFullfillAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};

export const referralSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchReferrals.SUCCESS, (state, action) => {
        const {referrals} = action.payload;
        state.referrals = referrals;
      })
      .addCase(clearReferrals.SUCCESS, (state, action) => {
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

export default referralSlice.reducer;
