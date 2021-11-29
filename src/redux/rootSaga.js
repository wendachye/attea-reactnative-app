import {all, spawn, call} from 'redux-saga/effects';
import userSaga from './sagas/userSaga';
import settingSaga from './sagas/settingSaga';
import menuSaga from './sagas/menuSaga';
import voucherSaga from './sagas/voucherSaga';
import stampSaga from './sagas/stampSaga';
import pointSaga from './sagas/pointSaga';
import orderSaga from './sagas/orderSaga';
import referralSaga from './sagas/referralSaga';

export default function* rootSaga() {
  const sagas = [
    userSaga,
    settingSaga,
    menuSaga,
    voucherSaga,
    stampSaga,
    pointSaga,
    orderSaga,
    referralSaga,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error('Saga error, the saga will be restarted', e);
          }
        }
      }),
    ),
  );
}
