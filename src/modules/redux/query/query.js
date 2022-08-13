import {
  REQUEST_QUERY,
  RECEIVE_QUERY_SUCCESS,
  RECEIVE_QUERY_ERROR,
  CLEAR_QUERY_ERROR
} from './constants';

export * from './constants';
export * from './actions';

export function query(
  state = {
    isFetching: false,
    data: null,
    error: null
  },
  action
) {
  switch (action.type) {
    case REQUEST_QUERY:
      return {
        ...state,
        isFetching: true,
        data: undefined,
        error: undefined
      };

    case RECEIVE_QUERY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        error: undefined
      };

    case RECEIVE_QUERY_ERROR:
      return {
        ...state,
        isFetching: false,
        data: undefined,
        error: action.payload.error
      };

    case CLEAR_QUERY_ERROR:
      return {
        ...state,
        error: undefined
      };

    default:
      return state;
  }
}
