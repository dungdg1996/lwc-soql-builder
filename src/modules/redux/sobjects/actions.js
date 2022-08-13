import * as salesforce from 'service/salesforce';

import {
  REQUEST_SOBJECTS,
  RECEIVE_SOBJECTS_SUCCESS,
  RECEIVE_SOBJECTS_ERROR,
  CLEAR_SOBJECTS_ERROR
} from './constants';
import { updateApiLimit } from 'redux/ui';

function requestSObjects() {
  return {
    type: REQUEST_SOBJECTS
  };
}

function receiveSObjectsSuccess(data) {
  return {
    type: RECEIVE_SOBJECTS_SUCCESS,
    payload: { data }
  };
}

function receiveSObjectsError(error) {
  return {
    type: RECEIVE_SOBJECTS_ERROR,
    payload: { error }
  };
}

function shouldFetchSObjects({ sobjects }) {
  return !sobjects || !sobjects.data;
}

function fetchSObjects() {
  return async dispatch => {
    dispatch(requestSObjects());
    salesforce
      .describeGlobal()
      .then(res => {
        console.log('describeGlobal', res);
        dispatch(receiveSObjectsSuccess(res));
        dispatch(updateApiLimit());
      })
      .catch(err => {
        dispatch(receiveSObjectsError(err));
      });
  };
}

export function fetchSObjectsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchSObjects(getState())) {
      dispatch(fetchSObjects());
    }
  };
}

export function clearSObjectsError() {
  return {
    type: CLEAR_SOBJECTS_ERROR
  };
}
