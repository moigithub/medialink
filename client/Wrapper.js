'use strict';
import React,{Component, PropTypes} from 'react';
import MenuBar from './MenuBar';
import AZMenu from'./AZMenu';
import SideBar from './SideBar';

export default class Wrapper extends Component {
    constructor(props){
        super(props);
        
    }

    updateListByType(checklist){
        console.log("typelinks",checklist);
    }
    
    updateListByCateg(checklist){
        console.log("categ checks",checklist);
    }
    
    updateListByTag(tag){
        console.log("tag clicked", tag);
        //href={"/tags?option="+link} 
    }
    
    render(){
        return (
        <div>
            <MenuBar></MenuBar >
            <AZMenu></AZMenu >

            <div className="row">
                <div className="col-xs-12 col-lg-2">
                    <SideBar updateListByType={this.updateListByType} 
                            updateListByCateg={this.updateListByCateg} 
                            updateListByTag={this.updateListByTag}></SideBar>
                </div>
                <div className="col-xs-12 col-lg-10">
                    {this.props.children}
                    
                </div>
            </div>
            
        </div>
        );
    }
}

Wrapper.propTypes={
    children: PropTypes.element
}