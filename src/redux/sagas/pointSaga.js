import {takeLatest, all, put, select, call} from 'redux-saga/effects';
import {updateAccessToken} from '@redux/slices/userSlice';
import {fetchPoints} from '@redux/slices/pointSlice';
import fetchPointsAPI from '@apis/fetchPoints';

export default function* sagaWatcher() {
  yield all([takeLatest(fetchPoints.TRIGGER, handleFetchPoints)]);
}

function* handleFetchPoints(action) {
  try {
    yield put(fetchPoints.request());

    const state = yield select();
    const accessToken = state.user.accessToken;
    const userId = state.user.user?.id;
    const page = action?.payload?.page
      ? action?.payload?.page
      : state.points.currentPage + 1;

    const [data, error, newAccessToken] = yield call(() =>
      fetchPointsAPI(accessToken, userId, page),
    );

    if (newAccessToken) {
      yield put(updateAccessToken.success({accessToken: newAccessToken}));
    }

    if (error) {
      console.log('fetchPoints', error);
      yield put(fetchPoints.failure());
      return;
    }

    if (data?.code === 3001) {
      const point = {
        totalPoints: data.total_points,
        data: data.data,
        currentPage: Number(data.page),
        totalPages: Number(data.total_page),
      };

      yield put(fetchPoints.success({point}));
    } else {
      console.log('fetchPoints', data);
      yield put(fetchPoints.failure());
    }
  } catch (error) {
    console.log('fetchPoints', error);
    yield put(fetchPoints.failure());
  } finally {
    yield put(fetchPoints.fulfill());
  }
}
