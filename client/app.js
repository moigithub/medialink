'use strict';


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

// const Provider = require('react-redux').Provider
import { Provider } from 'react-redux';
import {getMediaDataFromServer ,getLatestMediaLinksDataFromServer} from './actions/mediaActions';

//import * as auth from './clientAuth';


import configureStore from './Store.js';

///// STORE ///
import {data,capitulos} from './seed';

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
    masVotados: data
};

const Store = configureStore(initialState);
// dispatch to get initial data from server
Store.dispatch(getMediaDataFromServer());
Store.dispatch(getLatestMediaLinksDataFromServer());

const Home = () => <h1>Hello from Home!</h1>

/////////////

ReactDOM.render( (
    <Provider store={Store}>
      <Router history={browserHistory}>
        <Route path="/" component={Wrapper}>
            <IndexRoute  component={Main}/>
            <Route path="capitulos" component={Main} />
            <Route path="media(/:userid)" component={MediaList} />
            <Route path="mediainfo(/:mediaName)" component={MediaInfo} />
            <Route path="vermedia(/:mediaName)(/:mediaLink)" component={VerMedia} />
            <Route path="newMedia" component={AddMediaForm} />
            <Route path="signup" component={SignUpForm} />
        </Route>
      </Router>
    </Provider>)
    , document.getElementById("app"));


//ReactDOM.render(<AddMediaForm></AddMediaForm>, document.getElementById("app"));
/*
        <IndexRoute  component={ImageList}/>
        <Route path="Picts/(:filter)" component={ImageList}  onEnter={requireAuth} />
<Redirect from="*" to="/" />
        <Route path="successLogin" component={SuccessLogin} />
*/

