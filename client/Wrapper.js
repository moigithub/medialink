'use strict';
import React,{Component, PropTypes} from 'react';

export default class Wrapper extends Component {
    constructor(props){
        super(props);
        
    }
    
    render(){
        return (
        <div>
            {this.props.children}
        </div>
        );
    }
}

Wrapper.propTypes={
    children: PropTypes.element
}