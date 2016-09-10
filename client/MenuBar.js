'use strict';

import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import * as auth from './clientAuth';

export default class MenuBar extends Component {
    render(){
    console.log(auth.getCurrentUser());
        return (
            <nav className="navbar bg-inverse bg-faded">
              
                
                  <button type="button" className="navbar-toggler hidden-sm-up" data-toggle="collapse" data-target="#navbar-collapse" 
                     aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">>
                     &#9776;
                  </button>
                  <Link to='/' className='navbar-brand'> MediaTECA</Link>
              
                <div className="collapse navbar-toggleable-xs" id="navbar-collapse">
                { auth.isLoggedIn() &&
                  <ul className="nav navbar-nav">
                    <li className="nav-item"><a href="#" className="nav-link"> my Saw list</a></li>
                    <li className="nav-item"><a href="#" className="nav-link"> to See list</a></li>
                    <li className="nav-item"><Link to="/media/me"  className="nav-link"> my Media List</Link></li>
                    <li className="nav-item"><Link to={`/newMedia`} className="nav-link">Add New Media</Link></li>
                  </ul>
                }
                
                  { !auth.isLoggedIn() ?
                  <ul className="nav navbar-nav pull-xs-right navrightmenu">
                    <li className="nav-item"><small className="form-text text-muted">Login with </small></li>
                    <li className="nav-item"><a className="nav-link" href="/login" >e-Mail <i className="fa fa-envelope-o fa-fw"></i></a></li>
                    <li className="nav-item"><a className="nav-link" href="/auth/twitter">Twitter <i className="fa fa-twitter fa-lg"></i></a></li>
                    <li className="nav-item"><a className="nav-link" href="/auth/facebook">Facebook <i className="fa fa-facebook fa-lg"></i></a></li>
                    <li className="nav-item"><small className="form-text text-muted"> | or </small></li>
                    <li className="nav-item"><a className="nav-link" href="/signup">Register </a></li>
                  </ul>
                  :
                  <ul className="nav navbar-nav pull-xs-right navrightmenu">
                    <li className="nav-item navbar-text">Welcome <span>{auth.getCurrentUser().displayName}</span></li>
                    <li className="nav-item"><a className="nav-link" href="/auth/logout"> Log Out</a></li>
                  </ul>
                  }
                </div>
            
        </nav>
        );
    }
}