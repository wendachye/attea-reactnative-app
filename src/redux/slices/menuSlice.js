import {createSlice} from '@reduxjs/toolkit';
import {createRoutine} from 'redux-saga-routines';

const name = 'menu';

const initialState = {
  loading: false,
  categories: [],
  hashTagProducts: [],
  condiments: [],
};

export const fetchMenu = createRoutine(`${name}/fetchMenu`);
export const fetchMenuByHashtag = createRoutine(`${name}/fetchMenuByHashTag`);
export const fetchCondiment = createRoutine(`${name}/fetchCondiment`);
export const clearCondiment = createRoutine(`${name}/clearCondiment`);
export const selectCondiment = createRoutine(`${name}/selectCondiment`);

const isRequestAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

const isFullfillAction = action => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};

export const menuSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchMenu.SUCCESS, (state, action) => {
        const {categories} = action.payload;
        state.categories = categories;
      })
      .addCase(fetchMenuByHashtag.SUCCESS, (state, action) => {
        const {hashTagProducts} = action.payload;
        state.hashTagProducts = hashTagProducts;
      })
      .addCase(fetchCondiment.SUCCESS, (state, action) => {
        const {condiments} = action.payload;
        state.condiments = condiments;
      })
      .addCase(clearCondiment.SUCCESS, (state, action) => {
        state.condiments = [];
      })
      .addCase(selectCondiment.TRIGGER, (state, action) => {
        const {condiment} = action.payload;

        let selectedCondimentGroup = state.condiments.find(
          condimentGroup => condimentGroup.con_id === condiment.parent_id,
        );

        if (selectedCondimentGroup) {
          if (selectedCondimentGroup.selections.includes(condiment.con_id)) {
            selectedCondimentGroup.selections = selectedCondimentGroup.selections.filter(
              item => item !== condiment.con_id,
            );
            return;
          }

          if (Number(selectedCondimentGroup.con_max_select) !== 0) {
            if (
              selectedCondimentGroup.selections.length ===
              Number(selectedCondimentGroup.con_max_select)
            ) {
              selectedCondimentGroup.selections.pop();
            }
          }

          selectedCondimentGroup.selections = [
            ...selectedCondimentGroup.selections,
            condiment.con_id,
          ];
        }
      })
      .addMatcher(isRequestAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isFullfillAction, (state, action) => {
        state.loading = false;
      });
  },
});

export default menuSlice.reducer;
