/*global localStorage*/

import { AZ_FILTER_TOGGLE,
         
         AZ_FILTER_CLEAR ,
    
         CATEG_FILTER_ADD,
         CATEG_FILTER_REM,
         CATEG_FILTER_CLEAR,
        
         MEDIA_TYPE_FILTER_ADD,
         MEDIA_TYPE_FILTER_REM,
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

export const AddCategFilter=(filter)=>{
    return {type: CATEG_FILTER_ADD, filter:filter};
};

export const RemCategFilter=(filter)=>{
    return {type: CATEG_FILTER_REM, filter:filter};
};

export const ClearCategFilter=()=>{
    return {type: CATEG_FILTER_CLEAR };
};

/////////////////////////////// MEDIA TYPE FILTER

export const AddMediaTypeFilter=(filter)=>{
    return {type: MEDIA_TYPE_FILTER_ADD, filter:filter};
};

export const RemMediaTypeFilter=(filter)=>{
    return {type: MEDIA_TYPE_FILTER_REM, filter:filter};
};

export const ClearMediaTypeFilter=()=>{
    return {type: MEDIA_TYPE_FILTER_CLEAR };
};

////////////////
// actions para guardarlo en localstorage, pa q no se pierda cuando refresh page

export function saveSettingsLocal(azFilter){
    console.log("saveSettingsLocal fiteractions", azFilter);
    if(azFilter!==null){         
        localStorage.azFilter = JSON.stringify(azFilter);
    } else { delete localStorage.azFilter; }
    
    
}


export function ClearAZFilterAsync(azFilter){
    console.log("clear async");
    return function(dispatch, getState){
        delete localStorage.azFilter;
        dispatch(ClearAZFilter());
    }
};

export function toggleAZFilterAsync(azFilter){
    console.log("toggle async");
    return function(dispatch, getState){
        dispatch(toggleAZFilter(azFilter));
        
        saveSettingsLocal(getState().azFilter);
    }
};