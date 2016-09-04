/*global Headers, fetch*/
'use strict';
import { ADD_MEDIA, ADD_MEDIA_LINK } from './actionConstants';
import * as actions from './actions/mediaActions';


require('es6-promise').polyfill();
import 'isomorphic-fetch';

import toastr from 'toastr';


export const AddMedia=(media)=>{
    return {type: ADD_MEDIA, media:media};
};

export const AddMediaLink=(media)=>{
    return {type: ADD_MEDIA_LINK, mediaLink:media};
};


///////////////////////////////////////////////////////////////////////////////
/// async actions
///////////////////////////////////////////////////////////////////////////////
export function getMediaDataFromServer() {
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
                data.forEach(function(media){
                    dispatch(AddMedia(media));
                });
            })
            .catch((err) => {
//                console.error("error",err);
                toastr.error('Error: '+err);
            });
    };

}

export function getLatestMediaLinksDataFromServer() {
    return function(dispatch){
        /// http request
        let opts = { 
            method: 'GET' , 
            headers: new Headers({
        //        'Content-Type': 'application/json; charset=utf-8',   //'x-www-form-urlencoded', <-- necesita new Formdata()+append  ....creo
                 Accept : "application/json; charset=utf-8"
            })        
        };


        fetch('/api/media/latestMediaLink', opts ) //es igual que datatype:'json'
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(function(data){
                console.log("success",data);
                data.forEach(function(media){
                    dispatch(AddMediaLink(media));
                });
            })
            .catch((err) => {
//                console.error("error",err);
                toastr.error('Error: '+err);
            });
    };

}


export function PostFormAsync(formData, userId){
    return function(dispatch){
        let mediaData ={
            whichUserIDPosted: userId,
            title: formData.medianame,
            imageUrl: formData.mediaimage,
            dateAdded: new Date(),
            lastUpdated: new Date(),
            shouldUpdate: true,
            userRate:[],
            categories: formData.mediacategs,
            tags: formData.mediatags,
            mediaType: formData.mediatype,
            likesCounter:0,
            viewCounter:0,
            description: formData.mediadesc,
            capitulos: formData.links.map((link,i)=>{
                return {
                    num: i,
                    nombre: link.linkName,
                    dateAdded: new Date(),
                    mirrors: link.linkUrl.map(mirror=>{
                        return {
                            link: mirror.link,
                            brokenStatus: mirror.brokenStatus,
                            dateAdded: mirror.dateAdded,
                            userID: mirror.userID,
                            enabled: mirror.enabled
                        }
                    })
                }
            })
            
        };
        
        
        let opts = { 
            method: 'POST' , 
        //    credentials: 'include',
            body: JSON.stringify(mediaData), 
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8',   //'x-www-form-urlencoded', <-- necesita new Formdata()+append  ....creo
                Accept : "application/json"   //es igual que datatype:'json' en jquery
            })        
        };

        return fetch('/api/media', opts) //es igual que datatype:'json'
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(function(data){
                //console.log("success",data);
                dispatch(AddMedia(data));
                toastr.info(formData.title + ' added');
            })
            .catch(function(err){
       //         console.error("error",err);
                toastr.error('Error: '+err);
            });
    }
}


///////login

export function PostLoginFormAsync(formData){
    return function(dispatch){

        let opts = { 
            method: 'POST' , 
        //    credentials: 'include',
            body: JSON.stringify(formData), 
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8',   //'x-www-form-urlencoded', <-- necesita new Formdata()+append  ....creo
                Accept : "application/json"   //es igual que datatype:'json' en jquery
            })        
        };

        return fetch('/api/login', opts) //es igual que datatype:'json'
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(function(data){
                //console.log("success",data);
//                dispatch(AddMedia(data));
                toastr.info( ' loggged');
            })
            .catch(function(err){
       //         console.error("error",err);
                toastr.error('Error: '+err);
            });
    }
}

///signup

export function PostSignUpFormAsync(formData){
    return function(dispatch){

        let opts = { 
            method: 'POST' , 
        //    credentials: 'include',
            body: JSON.stringify(formData), 
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8',   //'x-www-form-urlencoded', <-- necesita new Formdata()+append  ....creo
                Accept : "application/json"   //es igual que datatype:'json' en jquery
            })        
        };

        return fetch('/api/signup', opts) //es igual que datatype:'json'
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(function(data){
                //console.log("success",data);
//                dispatch(AddMedia(data));
                toastr.info( ' loggged');
            })
            .catch(function(err){
       //         console.error("error",err);
                toastr.error('Error: '+err);
            });
    }
}