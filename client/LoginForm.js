'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions/mediaActions';

class LoginForm extends Component {
    constructor(props){
        super(props);
        
        this.state={
            email:'',
            name:'',
            password:'',
            confirm:''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }
    
    handleChange(e){
        //console.log("control",e.target);
        var newState = {};
        newState[e.target.name]=e.target.value;
        this.setState(newState);
    }

    submitData(e){
        e.preventDefault();
        console.log(JSON.stringify(this.state));
        
        //dispatch action
        this.props.postForm(this.state);
    }
    
    render(){
        return (
            <div className="container">
                <h3>Log In</h3>
                <form action="/auth/login">
                    <div className="form-group row">
                        <label className="control-label col-sm-2" htmlFor="email">e-Mail</label>
                        <div className="col-sm-10">
                            <input type="text" name="email" value={this.state.email} className="form-control" onChange={this.handleChange} id="email" placeholder="Enter your email"/>
                        </div>
                     </div>
                    <div className="form-group row">
                        <label className="control-label col-sm-2" htmlFor="password">Password</label>
                        <div className="col-sm-10">
                            <input type="text" name="password" value={this.state.password} className="form-control" onChange={this.handleChange} id="password" placeholder="Enter your password"/>
                        </div>
                     </div>
                     <button type="submit" onClick={this.submitData} className="btn btn-success pull-right">Submit</button>
                </form>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch){
    return {
//        postForm: (formData)=>{dispatch(actions.PostFormAsync(formData, auth.getCurrentUser().userId));}
        postForm: (formData)=>{dispatch(actions.PostLoginFormAsync(formData));}
    };
}

//todo
/*
 crear un action pa updateListByCateg
 q guarde las categ-filtros
 en el store  (component state ?? )
*/
export default connect(null, mapDispatchToProps)(LoginForm);