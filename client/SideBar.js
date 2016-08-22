'use strict';
import React,{Component, PropTypes} from 'react';

import MediaListGroup from './MediaTypes';
import CategListGroup from './CategList';
import TagList from './TagsList';

export default class SideBar extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (
        <div className="sidebar">
            <MediaListGroup  changed={this.props.updateListByType}></MediaListGroup>
            <CategListGroup changed={this.props.updateListByCateg}></CategListGroup>
            <TagList changed={this.props.updateListByTag}></TagList>
        </div>
        );
    }
}
SideBar.propTypes ={
    updateListByType: PropTypes.func.isRequired,
    updateListByCateg: PropTypes.func.isRequired,
    updateListByTag: PropTypes.func.isRequired,
}

