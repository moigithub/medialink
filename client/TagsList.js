'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// this component accept a list of linktypes as array of string
// ["Anime", "Manga", "Serie", "Recipe"]

 class TagsList extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (    
            <div className="tags">
                <h2>Tags</h2>
                <ul className="list-group">
                    {this.props.list.map( (link,i)=>(
                        <li key={"tag"+i}>
                            <button onClick={()=>this.props.searchBy(link)}>{link}</button>
                        </li>
                    ))}
                </ul>
            </div>
            );
    }
}
TagsList.propTypes ={
    list: PropTypes.arrayOf(PropTypes.string),
    searchBy: PropTypes.func
}

//helpers

function mapStateToProps(state, ownProps){
    //console.log("tag list",state);
    return {
        list: state.tag
    };
}

function mapDispatchToProps(dispatch){
    
}

export default connect(mapStateToProps)(TagsList);