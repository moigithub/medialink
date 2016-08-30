'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as auth from './clientAuth';

class VerMedia extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (    
            <div className="row">
                <div className="list">
                {this.props.media.map((media,i)=>(
                    <div className="col-xs-6 col-sm-4 col-lg-3">
                        <div className="cuadro">
                            <a className="enlace" href={"/vermedia/"+media.title}>
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
VerMedia.propTypes ={
    media: PropTypes.arrayOf(PropTypes.object).isRequired
}

//helpers

function filter(medias, mediaName){
    console.log(mediaName);
    //console.log("filter form imagelist withRouter", filter, images , uid);
    if(mediaName!==""){ return medias.filter(media=>media.title===mediaName); }
    return medias;  // TODO:: return empty media ???
}

/// ownProps.params.userid
function mapStateToProps(state, ownProps){
    console.log(state, "ownprops",ownProps);
    
    return {
        //list: filter(state.media, ownProps.params.userid|| "all", auth.getCurrentUser().userId)
        media: filter(state.media, decodeURIComponent(ownProps.params.mediaName))
    };
}
/*
function mapDispatchToProps(dispatch){
    return {
        removeImage: image=>dispatch(RemoveImageAsync(image))
    };
}
*/

export default connect(mapStateToProps)(VerMedia);