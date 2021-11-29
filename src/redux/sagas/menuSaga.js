import {takeLatest, all, put, call} from 'redux-saga/effects';
import HttpClient from '@utils/httpClient';
import {
  fetchMenu,
  fetchMenuByHashtag,
  fetchCondiment,
} from '@redux/slices/menuSlice';
import {groupArrayByKey} from '@utils/utils';

const httpClient = HttpClient({
  guestOAuthToken: true,
});

export default function* sagaWatcher() {
  yield all([
    takeLatest(fetchMenu.TRIGGER, handleFetchMenu),
    takeLatest(fetchMenuByHashtag.TRIGGER, handleFetchMenuByHashTag),
    takeLatest(fetchCondiment.TRIGGER, handleFetchCondiment),
  ]);
}

const fetchProducts = async hashTagId => {
  let params = {
    out_id: 1,
    limit: 0,
  };

  if (hashTagId) {
    params.hashtag_id = hashTagId;
  }

  return await httpClient.get('/products/getProducts', {
    params,
  });
};

function* handleFetchMenu() {
  try {
    yield put(fetchMenu.request());

    const {data} = yield call(() => fetchProducts());

    if (data?.code === 3001) {
      let groupedCategories = groupArrayByKey(data.data, 'cat_name');
      let categories = [];

      for (const key in groupedCategories) {
        if (Object.hasOwnProperty.call(groupedCategories, key)) {
          const element = groupedCategories[key];

          categories = [
            ...categories,
            {
              title: key,
              data: element,
            },
          ];
        }
      }

      yield put(fetchMenu.success({categories}));
    } else {
      yield put(fetchMenu.failure());
    }
  } catch (error) {
    console.log('fetchMenu', error);
    yield put(fetchMenu.failure());
  } finally {
    yield put(fetchMenu.fulfill());
  }
}

function* handleFetchMenuByHashTag(action) {
  try {
    yield put(fetchMenuByHashtag.request());

    const {hashtagId} = action.payload;
    const {data} = yield call(() => fetchProducts(hashtagId));

    if (data?.code === 3001) {
      const hashTagProducts = data.data;

      yield put(fetchMenuByHashtag.success({hashTagProducts}));
    } else {
      yield put(fetchMenuByHashtag.failure());
    }
  } catch (error) {
    console.log('fetchMenuByHashtag', error);
    yield put(fetchMenuByHashtag.failure());
  } finally {
    yield put(fetchMenuByHashtag.fulfill());
  }
}

function* handleFetchCondiment(action) {
  try {
    yield put(fetchCondiment.request());

    const {productId} = action.payload;

    const params = {
      prod_id: productId,
    };

    const {data} = yield call(() =>
      httpClient.get('/products/getCondiment', {
        params,
      }),
    );

    if (data?.code === 3001) {
      const condiments = data.data;

      for (const condiment of condiments) {
        condiment.selections = [];
      }

      yield put(fetchCondiment.success({condiments}));
    } else {
      yield put(fetchCondiment.failure());
    }
  } catch (error) {
    console.log('fetchCondiment', error);
    yield put(fetchCondiment.failure());
  } finally {
    yield put(fetchCondiment.fulfill());
  }
}
