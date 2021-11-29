import {takeLatest, all, put, select, call} from 'redux-saga/effects';
import {updateAccessToken} from '@redux/slices/userSlice';
import {fetchStamps} from '@redux/slices/stampSlice';
import fetchStampsAPI from '@apis/fetchStamps';

export default function* sagaWatcher() {
  yield all([takeLatest(fetchStamps.TRIGGER, handleFetchStamps)]);
}

function* handleFetchStamps() {
  try {
    yield put(fetchStamps.request());

    const state = yield select();
    const accessToken = state.user.accessToken;
    const userId = state.user.user?.id;

    const [data, error, newAccessToken] = yield call(() =>
      fetchStampsAPI(accessToken, userId),
    );

    if (newAccessToken) {
      yield put(updateAccessToken.success({accessToken: newAccessToken}));
    }

    if (error) {
      console.log('fetchStamps', error);
      yield put(fetchStamps.failure());
      return;
    }

    if (data?.code === 3001) {
      const stamp = {
        title: data.stamp_title,
        totalStamps: data.max_stamp,
        data: data.data,
      };

      yield put(fetchStamps.success({stamp}));
    } else {
      console.log('fetchStamps', data);
      yield put(fetchStamps.failure());
    }
  } catch (error) {
    console.log('fetchStamps', error);
    yield put(fetchStamps.failure());
  } finally {
    yield put(fetchStamps.fulfill());
  }
}
