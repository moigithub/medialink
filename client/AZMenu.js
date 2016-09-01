'use strict';

import React, {Component} from 'react';

export default class AZMenu extends Component {
    handleChange(){}
    
    resetButtons(){}
    
    render(){
        var alphanum = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
        var botones=alphanum.map((b,i)=>(
            <label className="btn btn-primary" key={"btnaz"+i}> {b} 
              <input type="checkbox" name="alphanum[]" checked="true" onChange={this.handleChange} autoComplete="off"/>
            </label>
        ));
        return (
            <div className="container-fluid">
                <div className="row">
                    
                    <div className="btn-group alphanumFilter" data-toggle="buttons">
                      {botones}
                      <a className="btn btn-primary" href="#" onClick = {this.resetButtons} id="resetalphanum"> Reset</a>
                    </div>
                </div>
            </div>
        );
    }
}