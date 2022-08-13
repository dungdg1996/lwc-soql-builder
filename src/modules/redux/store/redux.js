import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { sobjects } from 'redux/sobjects';
import { sobject } from 'redux/sobject';
import { query } from 'redux/query';
import { ui } from 'redux/ui';

export const store = createStore(
  combineReducers({
    sobjects,
    sobject,
    query,
    ui
  }),
  applyMiddleware(thunk)
);
