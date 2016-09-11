'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions/filterActions';

// this component accept a list of mediaTypes as array of string
// ["Anime", "Manga", "Serie", "Recipe"]
class MediaListGroup extends Component {
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
        let botones = generaBotones(this.props.list, this.props.mediaTypeFilter);
        return (    
            <div className="mediaTypesList">
                <h2>Types</h2>
                <ul className="list-group">
                    {Object.keys(botones).map((b,i)=>(
                        <li key={"mediaType"+i} className="mediaTypeCheck">
                            <label> 
                                <input type="checkbox" 
                                onChange={this.handleChange.bind(this,b)}
                                checked={botones[b]} 
                                 />
                                {b}
                            </label>
                        </li>
                    ))}

                    <li className="mediaTypeCheck">
                        <button id="resetmediaTypes" onClick={()=>this.resetCheckListGroup}>Reset</button>
                    </li>
                </ul>
            </div>
            );
    }
}
MediaListGroup.propTypes ={
    list: PropTypes.arrayOf(PropTypes.string).isRequired
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
        list: state.mediaType , // es un array de letras activas: ["serie","anime"]
        mediaTypeFilter : state.mediaTypeFilter
    };
}


function mapDispatchToProps(dispatch, ownProps){
    return {
        toggleButton : (filter)=>dispatch(actions.toggleMediaTypeFilterAsync(filter)),
        clear        :       ()=>dispatch(actions.ClearMediaTypeFilterAsync())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaListGroup);
