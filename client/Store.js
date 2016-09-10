'use strict';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//import imageReducer from './reducers/imageReducer';


import { ADD_MEDIA,
         ADD_MEDIA_LINK, 
         ADD_TAG, 
         ADD_CATEG, 
         ADD_MEDIA_TYPE, 
         ADD_MAS_VISTOS, 
         ADD_MAS_VOTADOS,
         AZ_FILTER_TOGGLE,
         AZ_FILTER_CLEAR,
         
         CATEG_FILTER_ADD,
         CATEG_FILTER_REM,
         CATEG_FILTER_CLEAR,
         
         MEDIA_TYPE_FILTER_ADD,
         MEDIA_TYPE_FILTER_REM,
         MEDIA_TYPE_FILTER_CLEAR
} from './actions/actionConstants';
     

function mediaReducer(state=[], action){
    switch(action.type){
        case ADD_MEDIA:
            return [...state, action.media];
    }
    return state;
}


function mediaLinkReducer(state=[], action){
    switch(action.type){
        case ADD_MEDIA_LINK:
            return [...state, action.mediaLink];
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
            return [...state, action.mediaType];
    }
    return state;
}

function masVistosReducer(state=[], action){
    switch(action.type){
        case ADD_MAS_VISTOS:
            return [...state, action.masVistos];
    }
    return state;
}

function masVotadosReducer(state=[], action){
    switch(action.type){
        case ADD_MAS_VISTOS:
            return [...state, action.masVotados];
    }
    return state;
}

///////////// APP FILTER STATUS

function AZFilterReducer(state=[], action){
    switch(action.type){
        case AZ_FILTER_TOGGLE:
            if(state.indexOf(action.filter)===-1){
                return [...state, action.filter];
            } else {
                return state.filter(x=>x!==action.filter);
            }
        case AZ_FILTER_CLEAR:
            return [];
    }
    return state;
}

function categFilterReducer(state=[], action){
    switch(action.type){
        case CATEG_FILTER_ADD:
            return [...state, action.filter];
        case CATEG_FILTER_REM:
            return state.filter(x=>x!==action.filter);
        case CATEG_FILTER_CLEAR:
            return [];
    }
    return state;
}

function mediaTypeFilterReducer(state=[], action){
    switch(action.type){
        case MEDIA_TYPE_FILTER_ADD:
            return [...state, action.filter];
        case MEDIA_TYPE_FILTER_REM:
            return state.filter(x=>x!==action.filter);
        case MEDIA_TYPE_FILTER_CLEAR:
            return [];
    }
    return state;
}




export default function configureStore(initialState){
    const createStoreWithThunk = applyMiddleware(thunk)(createStore);
    const allReducers = combineReducers(
            {"media":mediaReducer, 
             "mediaLink":mediaLinkReducer,
             "tag":tagReducer, 
             "categ":categReducer, 
             'mediaType': mediaTypeReducer,
             'masVistos': masVistosReducer,
             'masVotados': masVotadosReducer,
             
             'azFilter':AZFilterReducer,
             'categFilter':categFilterReducer,
             'mediaTypeFilter':mediaTypeFilterReducer,
            });
    return createStoreWithThunk(allReducers, initialState);
}

