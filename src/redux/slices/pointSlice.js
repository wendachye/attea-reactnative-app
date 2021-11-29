import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';

const name = 'points';

const initialState = {
  loading: false,
  totalPoints: 0,
  data: [],
  currentPage: 1,
  totalPages: 1,
};

export const fetchPoints = createRoutine(`${name}/fetchPoints`);
export const clearPoints = createRoutine(`${name}/clearPoints`);

const isRequestAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

const isFullfillAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};

export const pointSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchPoints.SUCCESS, (state, action) => {
        const {point} = action.payload;

        if (point.currentPage > state.currentPage) {
          state.data = [...state.data, ...point.data];
        } else {
          state.data = point.data;
        }

        state.totalPoints = point.totalPoints;
        state.currentPage = Number(point.currentPage);
        state.totalPages = Number(point.totalPages);
      })
      .addCase(clearPoints.SUCCESS, (state, action) => {
        state.totalPoints = 0;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
      })
      .addMatcher(isRequestAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isFullfillAction, (state, action) => {
        state.loading = false;
      });
  },
});

export default pointSlice.reducer;
