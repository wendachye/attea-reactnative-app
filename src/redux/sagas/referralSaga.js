import {takeLatest, all, put, select, call} from 'redux-saga/effects';
import {updateAccessToken} from '@redux/slices/userSlice';
import {fetchReferrals} from '@redux/slices/referralSlice';
import fetchReferralsAPI from '@apis/fetchReferrals';

export default function* sagaWatcher() {
  yield all([takeLatest(fetchReferrals.TRIGGER, handleFetchReferrals)]);
}

function* handleFetchReferrals() {
  try {
    yield put(fetchReferrals.request());

    const state = yield select();
    const accessToken = state.user.accessToken;
    const userId = state.user.user?.id;

    const [data, error, newAccessToken] = yield call(() =>
      fetchReferralsAPI(accessToken, userId),
    );

    if (newAccessToken) {
      yield put(updateAccessToken.success({accessToken: newAccessToken}));
    }

    if (error) {
      console.log('fetchReferrals', error);
      yield put(fetchReferrals.failure());
      return;
    }

    if (data?.code === 3001) {
      yield put(fetchReferrals.success({referrals: data.data}));
    } else {
      console.log('fetchReferrals', data);
      yield put(fetchReferrals.failure());
    }
  } catch (error) {
    console.log('fetchReferrals', error);
    yield put(fetchReferrals.failure());
  } finally {
    yield put(fetchReferrals.fulfill());
  }
}
