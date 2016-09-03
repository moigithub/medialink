'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';

class SignUpForm extends Component {
    constructor(props){
        super(props);
        
        this.state={
            email:'',
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
                <h3>Register</h3>
                <form>
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
                    <div className="form-group row">
                        <label className="control-label col-sm-2" htmlFor="confirm">Confirm password</label>
                        <div className="col-sm-10">
                            <input type="text" name="confirm" value={this.state.confirm} className="form-control" onChange={this.handleChange} id="confirm" placeholder="re-enter password"/>
                        </div>
                     </div>
                     <button type="submit" onClick={this.submitData}>Submit</button>
                </form>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch){
    return {
//        postForm: (formData)=>{dispatch(actions.PostFormAsync(formData, auth.getCurrentUser().userId));}
        postForm: (formDate)=>{console.log("posting dataaaaaa signup form");}
    };
}

//todo
/*
 crear un action pa updateListByCateg
 q guarde las categ-filtros
 en el store  (component state ?? )
*/
export default connect(null, mapDispatchToProps)(SignUpForm);