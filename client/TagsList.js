'use strict';
import React,{Component, PropTypes} from 'react';

// this component accept a list of linktypes as array of string
// ["Anime", "Manga", "Serie", "Recipe"]


export default class TagsList extends Component {
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
                            <button onClick={()=>this.props.changed(link)}>{link}</button>
                        </li>
                    ))}
                </ul>
            </div>
            );
    }
}
TagsList.propTypes ={
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
    changed: PropTypes.func.isRequired
}

//helpers

