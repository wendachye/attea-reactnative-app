import {combineReducers} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import settingSlice from './slices/settingSlice';
import menuSlice from './slices/menuSlice';
import voucherSlice from './slices/voucherSlice';
import stampSlice from './slices/stampSlice';
import pointSlice from './slices/pointSlice';
import orderSlice from './slices/orderSlice';
import referralSlice from './slices/referralSlice';

const rootReducer = combineReducers({
  user: userSlice,
  settings: settingSlice,
  menu: menuSlice,
  vouchers: voucherSlice,
  stamps: stampSlice,
  points: pointSlice,
  orders: orderSlice,
  referrals: referralSlice,
});

export default rootReducer;
