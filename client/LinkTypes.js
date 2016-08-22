'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// this component accept a list of linktypes as array of string
// ["Anime", "Manga", "Serie", "Recipe"]
class LinksListGroup extends Component {
    constructor(props){
        super(props);
        this.resetCheckListGroup = this.resetCheckListGroup.bind(this);
        this.toggleCheck = this.toggleCheck.bind(this);
        
        this.state = {
            checkLists : toObject(this.props.list)
        };
    }
    
    toggleCheck(index){
        console.log("togle", index);
        var newState = this.state.checkLists.map((l,i)=>{
            if(i===index) return {name: l.name, selected: !l.selected};
            return l;
        });
        this.setState({checkLists: newState });
        this.props.changed(newState);
    }
    
    resetCheckListGroup(){
        var newState = this.state.checkLists.map((l,i)=>{
            return {name: l.name, selected: false};
            
        });
        this.setState({checkLists: newState });
        this.props.changed(newState);
    }
    
    render(){
        return (    
            <div className="linkTypesList">
                <h2>Types</h2>
                <ul className="list-group">
                    {this.state.checkLists.map( (link,i)=>(
                        <li key={"linkType"+i} className="linkTypeCheck">
                            <label> 
                                <input type="checkbox" onChange={()=>this.toggleCheck(i)} value={link.name} />
                                {link.name}
                            </label>
                        </li>
                    ))}

                    <li className="linkTypeCheck">
                        <button id="resetlinktypes" onClick={()=>this.resetCheckListGroup}>Reset</button>
                    </li>
                </ul>
            </div>
            );
    }
}
LinksListGroup.propTypes ={
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
    changed: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps){
    //console.log("categlist",state);
    return {
        list: state.linkType
    };
}

function mapDispatchToProps(dispatch){
    
}

//todo
/*
 crear un action pa updateListByCateg
 q guarde las categ-filtros
 en el store  (component state ?? )
*/
export default connect(mapStateToProps)(LinksListGroup);
//helpers

    // convert array to Array of object with keys {name, selected}
    function toObject(list){
        return list.map(elem=>{
           return {"name": elem, "selected": false} ;
        });
    }
