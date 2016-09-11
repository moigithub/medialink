/*global localStorage*/

import { AZ_FILTER_TOGGLE,
         
         AZ_FILTER_CLEAR ,
    
         CATEG_FILTER_TOGGLE,
         CATEG_FILTER_CLEAR,
        
         MEDIA_TYPE_FILTER_TOGGLE,
         MEDIA_TYPE_FILTER_CLEAR, 
    
} from './actionConstants';

/////////////////////////////////  AZ FILTER
export const toggleAZFilter=(filter)=>{
    return {type: AZ_FILTER_TOGGLE, filter:filter};
};


export const ClearAZFilter=()=>{
    return {type: AZ_FILTER_CLEAR };
};

/////////////////////////////// CATEG FILTER

export const ToggleCategFilter=(filter)=>{
    return {type: CATEG_FILTER_TOGGLE, filter:filter};
};


export const ClearCategFilter=()=>{
    return {type: CATEG_FILTER_CLEAR };
};

/////////////////////////////// MEDIA TYPE FILTER

export const ToggleMediaTypeFilter=(filter)=>{
    return {type: MEDIA_TYPE_FILTER_TOGGLE, filter:filter};
};


export const ClearMediaTypeFilter=()=>{
    return {type: MEDIA_TYPE_FILTER_CLEAR };
};

////////////////
// actions para guardarlo en localstorage, pa q no se pierda cuando refresh page

export function saveSettingsLocal(type, Filter){
    console.log("saveSettingsLocal fiteractions", Filter);
    
    switch (type){
        case AZ_FILTER_TOGGLE:
            if(Filter!==null){         
                localStorage.azFilter = JSON.stringify(Filter);
            } else { delete localStorage.azFilter; }
            break;
        case CATEG_FILTER_TOGGLE:
            if(Filter!==null){         
                localStorage.categFilter = JSON.stringify(Filter);
            } else { delete localStorage.categFilter; }
            break;
        case MEDIA_TYPE_FILTER_TOGGLE:
            if(Filter!==null){         
                localStorage.mediaTypeFilter = JSON.stringify(Filter);
            } else { delete localStorage.mediaTypeFilter; }
            break;
    }
}


/////////////////////// AZFILTER
export function ClearAZFilterAsync(){
    console.log("clear async");
    return function(dispatch, getState){
        dispatch(ClearAZFilter());
        saveSettingsLocal(AZ_FILTER_TOGGLE, null);
    }
};

export function toggleAZFilterAsync(Filter){
    console.log("toggle async");
    return function(dispatch, getState){
        dispatch(toggleAZFilter(Filter));
        
        saveSettingsLocal(AZ_FILTER_TOGGLE, getState().azFilter);
    }
};

/////////////////////// CATEGFILTER
export function ClearCategFilterAsync(){
    console.log("clear async");
    return function(dispatch, getState){
        dispatch(ClearCategFilter());
        saveSettingsLocal(CATEG_FILTER_TOGGLE, null);
    }
};

export function toggleCategFilterAsync(Filter){
    console.log("toggle async");
    return function(dispatch, getState){
        dispatch(ToggleCategFilter(Filter));
        
        saveSettingsLocal(CATEG_FILTER_TOGGLE, getState().categFilter);
    }
};

/////////////////////// MEDIATYPE FILTER
export function ClearMediaTypeFilterAsync(){
    console.log("clear async");
    return function(dispatch, getState){
        dispatch(ClearMediaTypeFilter());
        saveSettingsLocal(MEDIA_TYPE_FILTER_TOGGLE, null);
    }
};

export function toggleMediaTypeFilterAsync(Filter){
    console.log("toggle async");
    return function(dispatch, getState){
        dispatch(ToggleMediaTypeFilter(Filter));
        
        saveSettingsLocal(MEDIA_TYPE_FILTER_TOGGLE, getState().mediaTypeFilter);
    }
};

