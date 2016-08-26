'use strict';
import React,{Component, PropTypes} from 'react';
import MenuBar from './MenuBar';
import AZMenu from'./AZMenu';

export default class Wrapper extends Component {
    constructor(props){
        super(props);
        
    }
    
    render(){
        return (
        <div>
            <MenuBar />
            <AZMenu />
            {this.props.children}
        </div>
        );
    }
}

Wrapper.propTypes={
    children: PropTypes.element
}