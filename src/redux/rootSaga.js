import {all, spawn, call} from 'redux-saga/effects';
import userSaga from './sagas/userSaga';
import settingSaga from './sagas/settingSaga';
import menuSaga from './sagas/menuSaga';

export default function* rootSaga() {
  const sagas = [userSaga, settingSaga, menuSaga];

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
