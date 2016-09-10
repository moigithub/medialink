'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions/filterActions';

// this component accept a list of linktypes as array of string
// ["Anime", "Manga", "Serie", "Recipe"]
class CategListGroup extends Component {
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
        let botones = generaBotones(this.props.list, this.props.categFilter);
        return (    
            <div className="linkTypesList">
                <h2>Categories</h2>
                <ul className="list-group">
                    {Object.keys(botones).map((b,i)=>(
                        <li key={"Categ"+i} className="linkTypeCheck">
                            <label> 
                                <input type="checkbox" 
                                onChange={this.handleChange.bind(this,b)}
                                checked={botones[b]} 
                                 />
                                {b}
                            </label>
                        </li>
                    ))}
                    <li className="linkTypeCheck">
                        <button id="resetlinktypes" onClick={this.clearButtons}>Reset</button>
                    </li>
                </ul>
            </div>
            );
    }
}
CategListGroup.propTypes ={
    list: PropTypes.arrayOf(PropTypes.string)
}

function generaBotones(lista, nuevoStatus){
    let botones = {};
    lista.forEach(b=>{botones[b]=false});
    
    // activar lo que esta en el store azFilter
    if (Array.isArray(nuevoStatus) && nuevoStatus.length>0){
        nuevoStatus.forEach(boton =>{ botones[boton]=true; });
    }
    return botones;
}

function mapStateToProps(state, ownProps){
    //console.log("categlist",state);
    
    return {
        list: state.categ , // es un array de letras activas: ["accion","suspenso]
        categFilter : state.categFilter
    };
}


function mapDispatchToProps(dispatch, ownProps){
    return {
        toggleButton : (filter)=>dispatch(actions.toggleCategFilterAsync(filter)),
        clear        :       ()=>dispatch(actions.ClearCategFilterAsync())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CategListGroup);


