import {takeLatest, all, put, select, call} from 'redux-saga/effects';
import {fetchOrders} from '@redux/slices/orderSlice';
import {updateAccessToken} from '@redux/slices/userSlice';
import fetchOrderHistoryAPI from '@apis/fetchOrderHistory';

export default function* sagaWatcher() {
  yield all([takeLatest(fetchOrders.TRIGGER, handleFetchOrders)]);
}

function* handleFetchOrders(action) {
  try {
    yield put(fetchOrders.request());

    const state = yield select();
    const userId = state.user.user?.id;
    const accessToken = state.user.accessToken;
    const page = action?.payload?.page
      ? action?.payload?.page
      : state.points.currentPage + 1;

    const [data, error, newAccessToken] = yield call(() =>
      fetchOrderHistoryAPI(accessToken, userId, page),
    );

    if (newAccessToken) {
      yield put(updateAccessToken.success({accessToken: newAccessToken}));
    }

    if (error) {
      console.log('fetchPoints', error);
      yield put(fetchOrders.failure());
      return;
    }

    if (data?.code === 3001) {
      const order = {
        data: data.data,
        currentPage: Number(data.page),
        totalPages: Number(data.total_page),
      };

      yield put(fetchOrders.success({order}));
    } else {
      console.log('fetchOrders', data);
      yield put(fetchOrders.failure());
    }
  } catch (error) {
    console.log('fetchOrders', error);
    yield put(fetchOrders.failure());
  } finally {
    yield put(fetchOrders.fulfill());
  }
}
