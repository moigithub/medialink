'use strict';
import React,{Component, PropTypes} from 'react';

import LinksListGroup from './LinkTypes';
import CategListGroup from './CategList';
import TagList from './TagsList';

export default class SideBar extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (
        <div className="sidebar">
            <LinksListGroup  changed={this.props.updateListByType}></LinksListGroup>
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

