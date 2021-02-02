import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'

import {rootReducer} from "../reducers/rootReducer";

export const store = createStore(rootReducer, {},
  compose(applyMiddleware(thunk), autoRehydrate()));

persistStore(store);
