'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as auth from './clientAuth';

class MediaInfo extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (    
            <div className="list">
                {this.props.media.map((media,i)=>(
                <div className="row" key={"media"+i}>
                    <div className="col-xs-4 col-sm-3 col-lg-2">
                        <h3 className="titulo">{media.title}</h3>
                        <img className="img-responsive" src={media.imageUrl}/>
                    </div>
                    <div className="col-xs-8 col-sm-9 col-lg-10">
                        <p><span className="strong">Sinopsis:</span> {media.description}</p>
                        <p><span className="strong">Date Added:</span> {media.dateAdded}</p>
                        <p><span className="strong">Media Type:</span> {media.mediaType}</p>
                        <p><span className="strong">Posted by:</span> {media.whichUserIDPosted}</p>
                        <p><span className="strong">Likes:</span> {media.likesCounter}</p>
                        <p><span className="strong">Categories:</span> {media.categories.join(", ")}</p>
                        <p><span className="strong">Tags:</span> {media.tags.join(", ")}</p>
                        <p><span className="strong">Rating:</span> {media.userRate.length} *calc avg of user rates*</p>

                        <div id="listaCapitulos">
                            <ul>
                                {media.capitulos.map((cap,i)=>(
                                    <li key={"capitulo"+i}><a href={"/verMedia/"+media.title+"/"+cap.nombre}>{cap.nombre}</a></li>
                                ))}
                            </ul>
                        </div>
                            
                    </div>
                </div>
                
                ))}
            </div>                
            );
    }
}
MediaInfo.propTypes ={
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

export default connect(mapStateToProps)(MediaInfo);