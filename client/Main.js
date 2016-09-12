'use strict';
import React,{Component, PropTypes} from 'react';

import ListaCapitulos from './ListaCapitulos';
import MasVistos from './MasVistos';
import MasVotados from './MasVotados';


export default class Main extends Component {
    constructor(props){
        super(props);
        
        this.state={};
    }
    

    
    render(){
        return (    
            
            <div className="row">
                <div className="col-sm-8 col-lg-8">
                    <ListaCapitulos></ListaCapitulos>
                </div>
                <div className="col-sm-4 col-lg-4">
                    <MasVistos></MasVistos>
                    <MasVotados></MasVotados>
                </div>
            </div>
            
            );
    }
}
            