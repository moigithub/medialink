'use strict';

import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import * as auth from './clientAuth';

export default class MenuBar extends Component {
    render(){
    console.log(auth.getCurrentUser());
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
                  <Link to='/' className='navbar-brand'> MediaTECA</Link>
                </div>
                <div className="collapse navbar-collapse" id="navbar-collapse">
                { auth.isLoggedIn() &&
                  <ul className="nav navbar-nav">
                    <li><a href="#"> my Saw list</a></li>
                    <li><a href="#"> to See list</a></li>
                    <li><Link to="/media/me"> my Media List</Link></li>
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
                    <li><a className="navbar-link" href="/auth/twitter">Login with Twitter</a></li>
                    <li><a className="navbar-link" href="/auth/facebook">Login with Facebook</a></li>
                    <li><Link to="/login"  className="navbar-link">Login with e-Mail</Link></li>
                    <li><Link to="/signup" className="navbar-link">Register</Link></li>
                  </ul>
                  :
                  <ul className="nav navbar-nav navbar-right">
                    <li className="navbar-text">Welcome <span>{auth.getCurrentUser().displayName}</span></li>
                    <li><a className="navbar-link" href="/auth/logout"> Log Out</a></li>
                  </ul>
                  }
                </div>
            </div>
        </div>
        );
    }
}