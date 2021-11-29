import {takeLatest, all, put, select, call} from 'redux-saga/effects';
import {updateAccessToken} from '@redux/slices/userSlice';
import {
  fetchActiveVouchers,
  fetchPastVouchers,
} from '@redux/slices/voucherSlice';
import fetchVouchersAPI from '@apis/fetchVouchers';

export default function* sagaWatcher() {
  yield all([
    takeLatest(fetchActiveVouchers.TRIGGER, handleFetchActiveVouchers),
    takeLatest(fetchPastVouchers.TRIGGER, handleFetchPastVouchers),
  ]);
}

function* handleFetchActiveVouchers(action) {
  try {
    yield put(fetchActiveVouchers.request());

    const state = yield select();
    const accessToken = state.user.accessToken;
    const userId = state.user.user?.id;
    const page = action?.payload?.page
      ? action?.payload?.page
      : state.vouchers.activeVouchers.currentPage + 1;

    const [data, error, newAccessToken] = yield call(() =>
      fetchVouchersAPI(accessToken, userId, page, 1),
    );

    if (newAccessToken) {
      yield put(updateAccessToken.success({accessToken: newAccessToken}));
    }

    if (error) {
      console.log('fetchActiveVouchers', error);
      yield put(fetchActiveVouchers.failure());
      return;
    }

    if (data?.code === 3001) {
      const activeVouchers = {
        data: data.data,
        currentPage: Number(data.page),
        totalPages: Number(data.total_page),
      };

      yield put(
        fetchActiveVouchers.success({
          activeVouchers,
        }),
      );
    } else {
      console.log('fetchActiveVouchers', data);
      yield put(fetchActiveVouchers.failure());
    }
  } catch (error) {
    console.log('fetchActiveVouchers', error);
    yield put(fetchActiveVouchers.failure());
  } finally {
    yield put(fetchActiveVouchers.fulfill());
  }
}

function* handleFetchPastVouchers(action) {
  try {
    yield put(fetchPastVouchers.request());

    const state = yield select();
    const accessToken = state.user.accessToken;
    const userId = state.user.user?.id;
    const page = action?.payload?.page
      ? action.payload.page
      : state.vouchers.pastVouchers.currentPage + 1;

    const [data, error, newAccessToken] = yield call(() =>
      fetchVouchersAPI(accessToken, userId, page, 0),
    );

    if (newAccessToken) {
      yield put(updateAccessToken.success({accessToken: newAccessToken}));
    }

    if (error) {
      console.log('fetchPastVouchers', error);
      yield put(fetchPastVouchers.failure());
      return;
    }

    if (data?.code === 3001) {
      const pastVouchers = {
        data: data.data,
        currentPage: Number(data.page),
        totalPages: Number(data.total_page),
      };

      yield put(
        fetchPastVouchers.success({
          pastVouchers,
        }),
      );
    } else {
      console.log('fetchPastVouchers', data);
      yield put(fetchPastVouchers.failure());
    }
  } catch (error) {
    console.log('fetchPastVouchers', error);
    yield put(fetchPastVouchers.failure());
  } finally {
    yield put(fetchPastVouchers.fulfill());
  }
}
