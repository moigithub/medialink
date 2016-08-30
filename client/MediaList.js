'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as auth from './clientAuth';

class MediaList extends Component {
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
                            <a className="enlace" href={"/mediainfo/"+media.title}>
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

function filter(medias, filter, uid){
    //console.log("filter form imagelist withRouter", filter, images , uid);
    if(filter.toLowerCase()=="me"){ return medias.filter(media=>media.whichUserIDPosted===uid); }
    return medias;
}

/// ownProps.params.userid
function mapStateToProps(state, ownProps){
    console.log(state, "ownprops",ownProps, "userid",auth.getCurrentUser().userId);
    
    return {
        list: filter(state.media, ownProps.params.userid|| "all", auth.getCurrentUser().userId)
    };
}
/*
function mapDispatchToProps(dispatch){
    return {
        removeImage: image=>dispatch(RemoveImageAsync(image))
    };
}
*/

export default connect(mapStateToProps)(MediaList);