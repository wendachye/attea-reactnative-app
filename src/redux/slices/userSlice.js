import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';

const name = 'user';

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: null,
  accessToken: null,
};

export const setUser = createRoutine(`${name}/setUser`);
export const updateUser = createRoutine(`${name}/updateUser`);
export const logout = createRoutine(`${name}/logout`);
export const updateAccessToken = createRoutine(`${name}/updateAccessToken`);

const isRequestAction = action => {
  return action.type.endsWith('REQUEST');
};

const isFullfillAction = action => {
  return action.type.endsWith('FULFILL');
};

export const userSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder
      .addCase(setUser.SUCCESS, (state, action) => {
        const {user, accessToken} = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.isLoggedIn = true;
      })
      .addCase(updateUser.SUCCESS, (state, action) => {
        const {user} = action.payload;
        state.user = {...state.user, ...user};
      })
      .addCase(logout.SUCCESS, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(updateAccessToken.SUCCESS, (state, action) => {
        const {accessToken} = action.payload;
        state.accessToken = accessToken;
      })
      .addMatcher(isRequestAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isFullfillAction, (state, action) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
