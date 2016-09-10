'use strict';
/*global localStorage*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,  browserHistory, IndexRoute, Redirect} from 'react-router';
import Main from './Main';
import MediaList from './MediaList';
import MediaInfo from './MediaInfo';
import VerMedia from './VerMedia';
import AddMediaForm from './Form';
import Wrapper from './Wrapper';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

// const Provider = require('react-redux').Provider
import { Provider } from 'react-redux';
import {getMediaDataFromServer ,getLatestMediaLinksDataFromServer} from './actions/mediaActions';

import * as auth from './clientAuth';


import configureStore from './Store.js';

///// STORE ///
import {data,capitulos} from './seed';

import './styles/styles.css';

const initialState = {
    media:[
 //       {_id:1, title:'mono', imageURL:'http://i2.asntown.net/ha/Animals/finger-monkey/finger_monkeys_640_04.jpg', likesCount:4, userId:1},
 //       {_id:2, title:'i dun care', imageURL:'https://s-media-cache-ak0.pinimg.com/236x/04/0b/aa/040baad9f12d5fa530a833055cb8647b.jpg', likesCount:9, userId:1}
        ],
    mediaLink:[],
    mediaType:  ["Anime", "Manga", "Serie", "Recipe"],
    categ: ["Accion", "Suspenso", "Drama", "Sci-Fi"],
    tag  : ["transformation", "magic", "bones", "ghost"],
    masVistos: data,
    masVotados: data,
    
    /// app filter status
    azFilter: JSON.parse(localStorage.azFilter||"[]"),
    categFilter:JSON.parse(localStorage.categFilter||"[]"),
    mediaTypeFilter:[]
};

const Store = configureStore(initialState);
// dispatch to get initial data from server
Store.dispatch(getMediaDataFromServer());
Store.dispatch(getLatestMediaLinksDataFromServer());

const Home = () => <h1>Hello from Home!</h1>

console.log("app.js window_user", window.__USER__);
if(window.__USER__) {
    auth.setUser(JSON.parse(window.__USER__));
} else {
    auth.setUser(null);
}
/////////////
function requireAuth(nextState, replace) {
    console.log("route requireauth",Store.getState());
  if (!auth.isLoggedIn()) {
      /*
    replace({
      pathname: '/auth/twitter' // only work if auth/twiter if part of <Route> list
    })
    */
    window.location = "/";
    //alert("not logged");
    
    
    //router.replace({ pathname, query, state }) // new "location descriptor"
     
  }
}

ReactDOM.render( (
    <Provider store={Store}>
      <Router history={browserHistory}>
        <Route path="/"  component={Wrapper}>
            <IndexRoute  component={Main}/>
            <Route path="login"  />
            <Route path="signup"  />
            <Route path="capitulos" component={Main} />
            <Route path="media(/:userid)" component={MediaList} />
            <Route path="mediainfo(/:mediaName)" component={MediaInfo} />
            <Route path="vermedia(/:mediaName)(/:mediaLink)" component={VerMedia} />
            <Route path="newMedia" component={AddMediaForm}   onEnter={requireAuth}  />
        </Route>
      </Router>
    </Provider>)
    , document.getElementById("app"));


//ReactDOM.render(<AddMediaForm></AddMediaForm>, document.getElementById("app"));
/*

            <Route path="signup" component={SignUpForm} />
            <Route path="login" component={LoginForm} />



        <IndexRoute  component={ImageList}/>
        <Route path="Picts/(:filter)" component={ImageList}  onEnter={requireAuth} />
<Redirect from="*" to="/" />
        <Route path="successLogin" component={SuccessLogin} />
*/

