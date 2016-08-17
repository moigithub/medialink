/*global Headers, fetch*/
'use strict';
import { ADD_MEDIA } from './actionConstants';


require('es6-promise').polyfill();
import 'isomorphic-fetch';

import toastr from 'toastr';


export const AddMedia=(media)=>{
    return {type: ADD_MEDIA, media:media};
};



///////////////////////////////////////////////////////////////////////////////
/// async actions
///////////////////////////////////////////////////////////////////////////////
export function getDataFromServer() {
    return function(dispatch){
        /// http request
        let opts = { 
            method: 'GET' , 
            headers: new Headers({
        //        'Content-Type': 'application/json; charset=utf-8',   //'x-www-form-urlencoded', <-- necesita new Formdata()+append  ....creo
                 Accept : "application/json; charset=utf-8"
            })        
        };


        fetch('/api/media', opts ) //es igual que datatype:'json'
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(function(data){
                //console.log("success",data);
                data.forEach(function(image){
                    dispatch(AddMedia(image));
                });
            })
            .catch((err) => {
//                console.error("error",err);
                toastr.error('Error: '+err);
            });
    };

}
