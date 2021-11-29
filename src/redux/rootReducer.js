import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import settingReducer from './slices/settingSlice';
import menuReducer from './slices/menuSlice';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingReducer,
  menu: menuReducer,
});

export default rootReducer;
