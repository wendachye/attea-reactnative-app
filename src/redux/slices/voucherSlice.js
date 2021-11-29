import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';

const name = 'vouchers';

const initialState = {
  loading: false,
  activeVouchers: {
    data: [],
    currentPage: 1,
    totalPages: 1,
  },
  pastVouchers: {
    data: [],
    currentPage: 1,
    totalPages: 1,
  },
};

export const fetchActiveVouchers = createRoutine(`${name}/fetchActiveVouchers`);
export const fetchPastVouchers = createRoutine(`${name}/fetchPastVouchers`);
export const clearVouchers = createRoutine(`${name}/clearVouchers`);

const isRequestAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

const isFullfillAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};

export const settingSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchActiveVouchers.SUCCESS, (state, action) => {
        const {activeVouchers} = action.payload;

        if (activeVouchers.currentPage > state.activeVouchers.currentPage) {
          state.activeVouchers.data = [
            ...state.activeVouchers.data,
            ...activeVouchers.data,
          ];
          state.activeVouchers.currentPage = Number(activeVouchers.currentPage);
          state.activeVouchers.totalPages = Number(activeVouchers.totalPages);
        } else {
          state.activeVouchers = activeVouchers;
        }
      })
      .addCase(fetchPastVouchers.SUCCESS, (state, action) => {
        const {pastVouchers} = action.payload;

        if (pastVouchers.currentPage > state.pastVouchers.currentPage) {
          state.pastVouchers.data = [
            ...state.pastVouchers.data,
            ...pastVouchers.data,
          ];
          state.pastVouchers.currentPage = Number(pastVouchers.currentPage);
          state.pastVouchers.totalPages = Number(pastVouchers.totalPages);
        } else {
          state.pastVouchers = pastVouchers;
        }
      })
      .addCase(clearVouchers.SUCCESS, (state, action) => {
        state.activeVouchers = {
          data: [],
          currentPage: 1,
          totalPages: 1,
        };
        state.pastVouchers = {
          data: [],
          currentPage: 1,
          totalPages: 1,
        };
      })
      .addMatcher(isRequestAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isFullfillAction, (state, action) => {
        state.loading = false;
      });
  },
});

export default settingSlice.reducer;
