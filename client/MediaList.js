'use strict';
import React,{Component, PropTypes} from 'react';


export default class MediaList extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (    
            <div className="row">
                <div className="list">
                {this.props.list.map((media,i)=>(
                    <div className="col-xs-6 col-sm-4 col-lg-3">
                        <div className="cuadro">
                            <a className="enlace" href={"/"+media.title}>
                                <h3 className="titulo">{media.title}</h3>
                                <img className="img-responsive" src={media.imageUrl}/>
                                <div className="playMe">
                                    <i className="fa fa-play-circle" aria-hidden="true"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                
                ))}
                </div>
            </div>                
            );
    }
}
MediaList.propTypes ={
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

//helpers



