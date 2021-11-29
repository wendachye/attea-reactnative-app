import {takeLatest, all, put, call, fork} from 'redux-saga/effects';
import HttpClient from '@utils/httpClient';
import {
  fetchSettings,
  fetchMoods,
  fetchOutlets,
  fetchPromotions,
  fetchAnnouncements,
  setLanguage,
} from '@redux/slices/settingSlice';
import {strings} from '@localizations/localization';

const httpClient = HttpClient({
  guestOAuthToken: true,
});

export default function* sagaWatcher() {
  yield all([
    takeLatest(fetchSettings.TRIGGER, handleFetchSettings),
    takeLatest(fetchMoods.TRIGGER, handleFetchMoods),
    takeLatest(fetchOutlets.TRIGGER, handleFetchOutlets),
    takeLatest(fetchPromotions.TRIGGER, handleFetchPromotions),
    takeLatest(fetchAnnouncements.TRIGGER, handleFetchAnnouncements),
    takeLatest(setLanguage.TRIGGER, handleSetLanguage),
  ]);
}

function* handleFetchSettings() {
  try {
    yield put(fetchSettings.request());

    yield fork(() => handleFetchMoods());
    yield fork(() => handleFetchOutlets());
    yield fork(() => handleFetchPromotions());
    yield fork(() => handleFetchAnnouncements());

    yield put(fetchSettings.success());
  } catch (error) {
    console.log('fetchSettings', error);
    yield put(fetchSettings.failure());
  } finally {
    yield put(fetchSettings.fulfill());
  }
}

function* handleFetchMoods() {
  try {
    yield put(fetchMoods.request());

    const {data} = yield call(() => httpClient.get('/mood/getmood'));

    if (data?.code === 3001) {
      yield put(fetchMoods.success({moods: data.data}));
    } else {
      yield put(fetchMoods.failure());
    }
  } catch (error) {
    console.log('fetchMoods', error);
    yield put(fetchMoods.failure());
  } finally {
    yield put(fetchMoods.fulfill());
  }
}

function* handleFetchOutlets() {
  try {
    yield put(fetchOutlets.request());

    const {data} = yield call(() => httpClient.get('/outlet/getoutletlist'));

    if (data?.code === 3001) {
      yield put(fetchOutlets.success({outlets: data.data}));
    } else {
      yield put(fetchOutlets.failure());
    }
  } catch (error) {
    console.log('fetchOutlets', error);
    yield put(fetchOutlets.failure());
  } finally {
    yield put(fetchOutlets.fulfill());
  }
}

function* handleFetchPromotions() {
  try {
    yield put(fetchPromotions.request());

    const params = {
      limit: 0,
    };

    const {data} = yield call(() =>
      httpClient.get('/products/getpromotion', {
        params,
      }),
    );

    if (data?.code === 3001) {
      yield put(fetchPromotions.success({promotions: data.data}));
    } else {
      yield put(fetchPromotions.failure());
    }
  } catch (error) {
    console.log('fetchPromotions', error);
    yield put(fetchPromotions.failure());
  } finally {
    yield put(fetchPromotions.fulfill());
  }
}

function* handleFetchAnnouncements() {
  try {
    yield put(fetchAnnouncements.request());

    const params = {
      limit: 0,
    };

    const {data} = yield call(() =>
      httpClient.get('/insta/getMediaList', {
        params,
      }),
    );

    if (data?.code === 3001) {
      yield put(fetchAnnouncements.success({announcements: data.data}));
    } else {
      yield put(fetchAnnouncements.failure());
    }
  } catch (error) {
    console.log('fetchAnnouncements', error);
    yield put(fetchAnnouncements.failure());
  } finally {
    yield put(fetchAnnouncements.fulfill());
  }
}

function* handleSetLanguage(action) {
  try {
    yield put(setLanguage.request());

    const {language} = action.payload;

    strings.setLanguage(language);

    yield put(setLanguage.success({language}));
  } catch (error) {
    console.log('setLanguage', error);
    yield put(setLanguage.failure());
  } finally {
    yield put(setLanguage.fulfill());
  }
}
