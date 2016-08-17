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
            <LinksListGroup list={this.props.linkType} changed={this.props.updateListByType}></LinksListGroup>
            <CategListGroup list={this.props.categType} changed={this.props.updateListByCateg}></CategListGroup>
            <TagList list={this.props.tagList} changed={this.props.updateListByTag}></TagList>
        </div>
        );
    }
}
SideBar.propTypes ={
    linkType: PropTypes.arrayOf(PropTypes.string).isRequired,
    categType: PropTypes.arrayOf(PropTypes.string).isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateListByType: PropTypes.func.isRequired,
    updateListByCateg: PropTypes.func.isRequired,
    updateListByTag: PropTypes.func.isRequired,
}

