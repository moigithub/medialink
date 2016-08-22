'use strict';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//import imageReducer from './reducers/imageReducer';


import { ADD_MEDIA, 
         ADD_TAG, 
         ADD_CATEG, 
         ADD_MEDIA_TYPE, 
         ADD_MAS_VISTOS, 
         ADD_MAS_VOTADOS 
    
} from './actions/actionConstants';
     

function imageReducer(state=[], action){
    switch(action.type){
        case ADD_MEDIA:
            return [...state, action.media];
    }
    return state;
}


function categReducer(state=[], action){
    switch(action.type){
        case ADD_CATEG:
            return [...state, action.categ];
    }
    return state;
}


function tagReducer(state=[], action){
    switch(action.type){
        case ADD_TAG:
            return [...state, action.tag];
    }
    return state;
}

function mediaTypeReducer(state=[], action){
    switch(action.type){
        case ADD_MEDIA_TYPE:
            return [...state, action.tag];
    }
    return state;
}

function masVistosReducer(state=[], action){
    switch(action.type){
        case ADD_MAS_VISTOS:
            return [...state, action.tag];
    }
    return state;
}

function masVotadosReducer(state=[], action){
    switch(action.type){
        case ADD_MAS_VISTOS:
            return [...state, action.tag];
    }
    return state;
}


export default function configureStore(initialState){
    const createStoreWithThunk = applyMiddleware(thunk)(createStore);
    const allReducers = combineReducers(
            {"media":imageReducer, 
             "tag":tagReducer, 
             "categ":categReducer, 
             'mediaType': mediaTypeReducer,
             'masVistos': masVistosReducer,
             'masVotados': masVotadosReducer
            });
    return createStoreWithThunk(allReducers, initialState);
}

