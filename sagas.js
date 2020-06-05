import {call, put, takeLatest} from 'redux-saga/effects';
import {apikey} from './keys';
import {isLoading, isError, haveInfo} from './actions';

export function* fetchNumberInfo() {
  yield takeLatest('GET_NUMBER_INFO', fetchData);
}

let getNumberInfo = async (number) => {
  try {
    const response = await fetch(
      `https://api.vainu.io/api/v1/prospects/filter/?country=FI&phone=` +
        number,
      {
        method: 'GET',
        headers: {
          'API-key': apikey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return response.json();
  } catch (error) {
    isLoading(false);
    isError({error});
  }
};

export function* fetchData(action) {
  try {
    yield put(isLoading(true));
    const info = yield call(getNumberInfo, action.numberInfo);
    console.log('result', info);
    if (info && info[0]) {
      console.log('HAVE INFOS', info[0]);
      yield put(haveInfo({numberInfo: info[0]}));
    } else {
      yield put(haveInfo({numberInfo: [0]}));
    }
  } catch (error) {
    console.log('error', error);
    yield put(isError(true));
  }
}
