import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';

const name = 'orders';

const initialState = {
  loading: false,
  data: [],
  currentPage: 1,
  totalPages: 1,
};

export const fetchOrders = createRoutine(`${name}/fetchOrders`);
export const clearOrders = createRoutine(`${name}/clearOrders`);

const isRequestAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

const isFullfillAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};

export const orderSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.SUCCESS, (state, action) => {
        const {order} = action.payload;

        if (order.currentPage > state.currentPage) {
          state.data = [...state.data, ...order.data];
        } else {
          state.data = order.data;
        }

        state.currentPage = Number(order.currentPage);
        state.totalPages = Number(order.totalPages);
      })
      .addCase(clearOrders.SUCCESS, (state, action) => {
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

export default orderSlice.reducer;
