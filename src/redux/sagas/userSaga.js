import {takeLatest, all, put, select} from 'redux-saga/effects';
import HttpClient from '@utils/httpClient';
import {setUser, updateUser, logout} from '@redux/slices/userSlice';

export default function* sagaWatcher() {
  yield all([
    takeLatest(setUser.TRIGGER, handleSetUser),
    takeLatest(updateUser.TRIGGER, handleUpdateUser),
    takeLatest(logout.TRIGGER, handleLogout),
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

    const httpClient = HttpClient({
      defaultBasicAuth: true,
    });

    const params = {
      accessToken: state.user.accessToken.access_token,
    };

    httpClient.post('/customer/logout', params);

    yield put(logout.success());
  } catch (error) {
    console.log('logout', error);
    yield put(logout.failure());
  } finally {
    yield put(logout.fulfill());
  }
}
