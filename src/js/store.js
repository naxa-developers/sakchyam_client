import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import thunk from 'redux-thunk';
import rootReducer from './reducers/index.reducer';

/* eslint-disable  no-underscore-dangle */

const initialState = {};
const isDev = process.env.PLATFORM === 'local';

const isDevMiddleware = [thunk];
const isProdMiddleware = [thunk];

const store = isDev
  ? createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(...isDevMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
      ),
    )
  : createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...isProdMiddleware)),
    );

// store.subscribe(() => {
//   saveState(store.getState());
// });

export default store;
