'use strict';


import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,  browserHistory, IndexRoute, Redirect} from 'react-router';
import Main from './Main'

// const Provider = require('react-redux').Provider
import { Provider } from 'react-redux';
import {getDataFromServer} from './actions/mediaActions';

//import * as auth from './clientAuth';


import configureStore from './Store.js';

///// STORE ///

const initialState = {
    media:[
 //       {_id:1, title:'mono', imageURL:'http://i2.asntown.net/ha/Animals/finger-monkey/finger_monkeys_640_04.jpg', likesCount:4, userId:1},
 //       {_id:2, title:'i dun care', imageURL:'https://s-media-cache-ak0.pinimg.com/236x/04/0b/aa/040baad9f12d5fa530a833055cb8647b.jpg', likesCount:9, userId:1}
        ]
};

const Store = configureStore();
// dispatch to get initial data from server
Store.dispatch(getDataFromServer());



/////////////
ReactDOM.render(
    <Provider store={Store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute  component={Main}/>
    
            <Redirect from="*" to="/" />
        </Route>
      </Router>
    </Provider>
    , document.getElementById("app"));

/*
        <IndexRoute  component={ImageList}/>
        <Route path="Picts/(:filter)" component={ImageList}  onEnter={requireAuth} />

        <Route path="successLogin" component={SuccessLogin} />
*/