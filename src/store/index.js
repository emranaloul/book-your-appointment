import {combineReducers ,configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import user from './signup'
import thunk from 'redux-thunk';
import sellers from './sellers'
import loader from './loader'
import appointments from './appointment'

let reducers = combineReducers({user: user, seller: sellers, loader: loader, appointments:appointments});

let store = configureStore({reducer:reducers,middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })}, applyMiddleware(thunk) );

export default store;