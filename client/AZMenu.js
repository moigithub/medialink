'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions/filterActions';


class AZMenu extends Component {
    constructor(props){
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
        console.log(event.target)
    }
    
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
                      <a className="btn btn-primary" href="#" onClick = {this.props.clear} id="resetalphanum"> Reset</a>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps){
    //console.log(state, "ownprops",ownProps);
    return {
        azFilter : state.azFilter
    };
}


function mapDispatchToProps(dispatch, ownProps){
    return {
        add : (filter)=>dispatch(actions.AddAZFilter(filter)),
        rem : (filter)=>dispatch(actions.RemAZFilter(filter)),
        clear : ()=>dispatch(actions.ClearAZFilter())
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(AZMenu)