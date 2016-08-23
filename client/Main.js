'use strict';
import React,{Component, PropTypes} from 'react';

import ListaCapitulos from './ListaCapitulos';
import MasVistos from './MasVistos';
import MasVotados from './MasVotados';
import SideBar from './SideBar';


export default class Main extends Component {
    constructor(props){
        super(props);
        
        this.state={};
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
            <div className="row">
                <div className="col-xs-12 col-lg-2">
                    <SideBar updateListByType={this.updateListByType} 
                            updateListByCateg={this.updateListByCateg} 
                            updateListByTag={this.updateListByTag}></SideBar>
                </div>
                <div className="col-xs-12 col-lg-10">
                    <div className="row">
                        <div className="col-sm-8 col-lg-8">
                            <ListaCapitulos></ListaCapitulos>
                        </div>
                        <div className="col-sm-4 col-lg-4">
                            <MasVistos></MasVistos>
                            <MasVotados></MasVotados>
                        </div>
                    </div>
                    
                </div>
            </div>
            );
    }
}
            