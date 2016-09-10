'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions/filterActions';

class AZMenu extends Component {
    constructor(props){
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.clearButtons = this.clearButtons.bind(this);
        
    }
    
    clearButtons(){
        this.props.clear();
    }
    
    handleChange(key, event){
        console.log("change status", event.target, "key", key);

        //dispatch store key toggle
        this.props.toggleButton(key);
       // this.setState({botones: newState});
    }


    render(){
        let botones = generaBotones(this.props.azFilter);
        console.log("boo azmenu", botones);
        return (
            <div className="container-fluid">
                <div className="row">
                    
                    <div className="alphanumFilter" >
                      {
                        Object.keys(botones).map((b,i)=>(
                        
                            <label className={"btn btn-info btn-sm " + (botones[b]?"active":"")} key={"btnaz"+i}>
                            <input type="checkbox" 
                                id={"chk"+b}
                                checked={botones[b]} 
                                name={`alphanum[${b}]`} 
                                onChange={this.handleChange.bind(this,b)}
//                                onChange={()=>alert("change")}
                                />
                            {b }
                            </label>
                      ))
                      }
                      <a className="btn btn-primary btn-lg" href="#" onClick = {this.clearButtons} id="resetalphanum"> Reset</a>
                      
                      <form className="form-inline pull-xs-right" id="searchForm">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Search"/>
                          <button type="submit" className="btn btn-outline-success">Submit</button>
                        </div>
                      </form>
                  
                      
                    </div>
                </div>
            </div>
        );
    }
}

function generaBotones(nuevoStatus){
    let alphanum = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
    let botones = {};
    alphanum.forEach(b=>{botones[b]=false});
    
    // activar lo que esta en el store azFilter
    if (Array.isArray(nuevoStatus) && nuevoStatus.length>0){
        nuevoStatus.forEach(boton =>{ botones[boton]=true; });
    }
    return botones;
}

function mapStateToProps(state, ownProps){
    console.log("azMenu state",state, "ownprops",ownProps);
    return {
        azFilter : state.azFilter  // es un array de letras activas: [0,4,A,C]
    };
}


function mapDispatchToProps(dispatch, ownProps){
    return {
        toggleButton : (filter)=>dispatch(actions.toggleAZFilterAsync(filter)),
        clear        :       ()=>dispatch(actions.ClearAZFilterAsync())
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(AZMenu)