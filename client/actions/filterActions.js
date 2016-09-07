
import { AZ_FILTER_ADD,
         AZ_FILTER_REM,
         AZ_FILTER_CLEAR ,
    
         CATEG_FILTER_ADD,
         CATEG_FILTER_REM,
         CATEG_FILTER_CLEAR,
        
         MEDIA_TYPE_FILTER_ADD,
         MEDIA_TYPE_FILTER_REM,
         MEDIA_TYPE_FILTER_CLEAR, 
    
} from './actionConstants';

/////////////////////////////////  AZ FILTER
export const AddAZFilter=(filter)=>{
    return {type: AZ_FILTER_ADD, tag:filter};
};

export const RemAZFilter=(filter)=>{
    return {type: AZ_FILTER_REM, tag:filter};
};

export const ClearAZFilter=()=>{
    return {type: AZ_FILTER_CLEAR };
};

/////////////////////////////// CATEG FILTER

export const AddCategFilter=(filter)=>{
    return {type: CATEG_FILTER_ADD, tag:filter};
};

export const RemCategFilter=(filter)=>{
    return {type: CATEG_FILTER_REM, tag:filter};
};

export const ClearCategFilter=()=>{
    return {type: CATEG_FILTER_CLEAR };
};

/////////////////////////////// MEDIA TYPE FILTER

export const AddMediaTypeFilter=(filter)=>{
    return {type: MEDIA_TYPE_FILTER_ADD, tag:filter};
};

export const RemMediaTypeFilter=(filter)=>{
    return {type: MEDIA_TYPE_FILTER_REM, tag:filter};
};

export const ClearMediaTypeFilter=()=>{
    return {type: MEDIA_TYPE_FILTER_CLEAR };
};

