'use strict';

import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import * as auth from './clientAuth';

export default class MenuBar extends Component {
    render(){
    console.log(auth.getCurrentUser().userName);
        return (
            <div className="nav navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className='navbar-brand' href='/'> MediaTECA</a>
                </div>
                <div className="collapse navbar-collapse" id="navbar-collapse">
                { auth.isLoggedIn() &&
                  <ul className="nav navbar-nav">
                    <li><a href="#"> my Saw list</a></li>
                    <li><a href="#"> to See list</a></li>
                    <li><a href="/vermedia/me"> my Media List</a></li>
                    <li><Link to={`/newMedia`}>Add New Media</Link></li>
                  </ul>
                }
                  <form className="navbar-form navbar-right">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search"/>
                      <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                  </form>
                  { !auth.isLoggedIn() ?
                  <ul className="nav navbar-nav navbar-right">
                    <li><a className="navbar-link" href="/login"> Login</a></li>
                    <li><a className="navbar-link" href="/signup"> Sign Up</a></li>
                  </ul>
                  :
                  <ul className="nav navbar-nav navbar-right">
                    <li className="navbar-text">Welcome <span>{auth.getCurrentUser().userName}</span></li>
                    <li><a className="navbar-link" href="/logout"> Log Out</a></li>
                  </ul>
                  }
                </div>
            </div>
        </div>
        );
    }
}