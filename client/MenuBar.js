import React, {Component} from 'react';

export default class MenuBar extends Component {
    render(){
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
                  <ul className="nav navbar-nav">
                    <li><a href="#"> my Saw list</a></li>
                    <li><a href="#"> to See list</a></li>
                    <li><a href="#"> my Media List</a></li>
                    <li><a href="/newMedia"> Add New Media</a></li>
                  </ul>
                  <form className="navbar-form navbar-right">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search"/>
                      <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                  </form>
                  <ul className="nav navbar-nav navbar-right">
                    <li><a className="navbar-link" href="/login"> Login</a></li>
                    <li><a href="/logout"> Log Out</a></li>
                    <li><a href="/signup"> Sign Up</a></li>
                  </ul>
                </div>
            </div>
        </div>
        );
    }
}