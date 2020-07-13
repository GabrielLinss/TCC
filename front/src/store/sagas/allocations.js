import { takeLatest, put, all } from 'redux-saga/effects';

function* loadAllocationsSaga(action) {
  try {
    yield put({ type: 'LOAD_ALLOCATIONS_SUCCESS', data: action.data });
  } catch (err) {
    yield put({ type: 'LOAD_ALLOCATIONS_FAILURE' });
  }
}

export default function* root() {
  yield all([
    takeLatest('LOAD_ALLOCATIONS_SAGA', loadAllocationsSaga)
  ]);
}
