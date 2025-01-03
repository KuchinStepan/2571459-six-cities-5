import {configureStore} from '@reduxjs/toolkit';

import {api} from '@api';
import {rootReducer} from '@root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
