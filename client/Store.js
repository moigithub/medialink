'use strict';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//import imageReducer from './reducers/imageReducer';


import { ADD_MEDIA } from './actions/actionConstants';
     

function imageReducer(state=[], action){
    switch(action.type){
        case ADD_MEDIA:
            return [...state, action.media];
    }
    return state;
}

export default function configureStore(initialState){
    const createStoreWithThunk = applyMiddleware(thunk)(createStore);
    const allReducers = combineReducers({"media":imageReducer});
    return createStoreWithThunk(allReducers, initialState);
}

