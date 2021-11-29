import {takeLatest, all, put, select, call} from 'redux-saga/effects';
import {
  setUser,
  updateUser,
  logout,
  fetchAccessToken,
} from '@redux/slices/userSlice';
import {clearStamps} from '@redux/slices/stampSlice';
import {clearVouchers} from '@redux/slices/voucherSlice';
import {clearOrders} from '@redux/slices/orderSlice';
import {clearReferrals} from '@redux/slices/referralSlice';
import logoutAPI from '@apis/logout';
import fetchAccessTokenAPI from '@apis/fetchAccessToken';

export default function* sagaWatcher() {
  yield all([
    takeLatest(setUser.TRIGGER, handleSetUser),
    takeLatest(updateUser.TRIGGER, handleUpdateUser),
    takeLatest(logout.TRIGGER, handleLogout),
    takeLatest(fetchAccessToken.TRIGGER, handleFetchAccessToken),
  ]);
}

function* handleSetUser(action) {
  try {
    yield put(setUser.request());
    const {user, accessToken} = action.payload;

    yield put(setUser.success({user, accessToken}));
  } catch (error) {
    console.log('setUser', error);
    yield put(setUser.failure());
  } finally {
    yield put(setUser.fulfill());
  }
}

function* handleUpdateUser(action) {
  try {
    yield put(updateUser.request());
    const {user} = action.payload;

    yield put(updateUser.success({user}));
  } catch (error) {
    console.log('updateUser', error);
    yield put(updateUser.failure());
  } finally {
    yield put(updateUser.fulfill());
  }
}

function* handleLogout() {
  try {
    yield put(logout.request());

    const state = yield select();
    const accessToken = state.user.accessToken?.access_token;

    logoutAPI(accessToken);

    yield put(clearStamps.success());
    yield put(clearVouchers.success());
    yield put(clearOrders.success());
    yield put(clearReferrals.success());
    yield put(logout.success());
  } catch (error) {
    console.log('logout', error);
    yield put(logout.failure());
  } finally {
    yield put(logout.fulfill());
  }
}

function* handleFetchAccessToken() {
  try {
    yield put(fetchAccessToken.request());

    const state = yield select();
    const refreshToken = state.user.accessToken?.refresh_token;

    const [data, error] = yield call(() => fetchAccessTokenAPI(refreshToken));

    if (error) {
      console.log('fetchAccessToken', error);
      yield put(fetchAccessToken.failure());
      yield put(logout.trigger());
      return;
    }

    yield put(fetchAccessToken.success({accessToken: data}));
  } catch (error) {
    console.log('fetchAccessToken', error);
    yield put(fetchAccessToken.failure());
    yield put(logout.trigger());
  } finally {
    yield put(fetchAccessToken.fulfill());
  }
}
