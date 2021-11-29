import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';

const name = 'settings';

const initialState = {
  loading: false,
  language: 'en',
  moods: [],
  outlets: [],
  promotions: [],
  announcements: [],
};

export const fetchSettings = createRoutine(`${name}/fetchSettings`);
export const fetchMoods = createRoutine(`${name}/fetchMoods`);
export const fetchOutlets = createRoutine(`${name}/fetchOutlets`);
export const fetchPromotions = createRoutine(`${name}/fetchPromotions`);
export const fetchAnnouncements = createRoutine(`${name}/fetchAnnouncements`);
export const setLanguage = createRoutine(`${name}/setLanguage`);

const isRequestAction = action => {
  return action.type.endsWith('REQUEST');
};

const isFullfillAction = action => {
  return action.type.endsWith('FULFILL');
};

export const settingSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchMoods.SUCCESS, (state, action) => {
        const {moods} = action.payload;
        state.moods = moods;
      })
      .addCase(fetchOutlets.SUCCESS, (state, action) => {
        const {outlets} = action.payload;
        state.outlets = outlets;
      })
      .addCase(fetchPromotions.SUCCESS, (state, action) => {
        const {promotions} = action.payload;
        state.promotions = promotions;
      })
      .addCase(fetchAnnouncements.SUCCESS, (state, action) => {
        const {announcements} = action.payload;
        state.announcements = announcements;
      })
      .addCase(setLanguage.SUCCESS, (state, action) => {
        const {language} = action.payload;
        state.language = language;
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
