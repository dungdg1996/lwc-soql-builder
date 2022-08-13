import {
  REQUEST_SOBJECT,
  RECEIVE_SOBJECT_SUCCESS,
  RECEIVE_SOBJECT_ERROR,
  CLEAR_SOBJECT_ERROR
} from './constants';

function _sobject(
  state = {
    isFetching: false,
    data: null,
    error: null
  },
  action
) {
  switch (action.type) {
    case REQUEST_SOBJECT:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_SOBJECT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        error: null
      };

    case RECEIVE_SOBJECT_ERROR:
      return {
        ...state,
        isFetching: false,
        data: undefined,
        error: action.payload.error
      };

    case CLEAR_SOBJECT_ERROR:
      return {
        ...state,
        error: undefined
      };

    default:
      return state;
  }
}

export * from './constants';
export * from './actions';

export function sobject(state = {}, action) {
  switch (action.type) {
    case REQUEST_SOBJECT:
    case RECEIVE_SOBJECT_SUCCESS:
    case RECEIVE_SOBJECT_ERROR:
    case CLEAR_SOBJECT_ERROR: {
      const sobjectState = state[action.payload.sObjectName];
      return {
        ...state,
        [action.payload.sObjectName]: _sobject(sobjectState, action)
      };
    }

    default:
      return state;
  }
}
