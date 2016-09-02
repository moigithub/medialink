'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as auth from './clientAuth';
/*
MUESTRA EL LINK CON TODOS SUS MIRRORS
*/
class VerMedia extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const {media, mediaLink} = this.props;
        const mirrors = getMirrors(media, mediaLink) ||[];
        console.log("render mirror",mirrors);
        return (    
            <div className="list">
                {media && media.title  && <div className="row">
                    <div className="col-xs-4 col-sm-3 col-lg-2">
                        <h3 className="titulo">{media.title}</h3>
                        
                        <img className="img-responsive" src={media.imageUrl}/>
                        <div id="listaCapitulos">
                            {media.capitulos && media.capitulos.length && <ul>
                                {media.capitulos.map((cap,i)=>(
                                    <li key={"capitulo"+i}><a href={"/verMedia/"+media.title+"/"+cap.nombre}>{cap.nombre}</a></li>
                                ))}
                            </ul>}
                        </div>
                    </div>
                    <div className="col-xs-8 col-sm-9 col-lg-10">
                        <h3>{mediaLink}</h3>
                        {mirrors.length && <div className="embed-responsive embed-responsive-4by3">
                          <iframe className="embed-responsive-item" src={mirrors[0].link}></iframe>
                        </div>
                        }
                        <div id="listaCapitulos">
                            {!!mirrors && <ul>
                                {mirrors.map((mirror,i)=>(
                                    <li key={"mirror"+i}>
                                        <a href={"/playMedia/"+mirror.link}>{mirror.link}</a>
                                        - posted by: <span className="user">{mirror.userID}</span> 
                                        <button className="btn btn-danger">Report broken</button>
                                    </li>
                                ))}
                            </ul>
                            }
                        </div>
                    </div>
                </div>

            }
            </div>
            
            );
    }
}
VerMedia.propTypes ={
//    media: PropTypes.arrayOf(PropTypes.object)
}

/*
                            {this.props.mirrors.map((mirror,i)=>(
                            ))}

*/

//helpers

function filter(medias, mediaName){
    
    //console.log("filter form imagelist withRouter", filter, images , uid);
    if(mediaName!==""){ 
        let filtered= medias.filter(media=>media.title===mediaName); 
        //console.log("fitlered ", filtered);
        if(filtered.length===0) return {error:true, title:'Not Found!', imageUrl:''};
        return filtered[0];
    }
    
    return medias;  // TODO:: return empty media ???
}

function getMirrors(theMedia, mediaLink){
    if(theMedia.error) return false;
    var elCapitulo= theMedia.capitulos.filter(capitulo => capitulo.nombre === mediaLink);
    //console.log("capitulo mirror",elCapitulo);
    if(elCapitulo.length>0)
        if(elCapitulo[0].mirrors && elCapitulo[0].mirrors.length>0 )
            return elCapitulo[0].mirrors;
        
    return false;
}


/// ownProps.params.userid
function mapStateToProps(state, ownProps){
    //console.log(state, "ownprops",ownProps);
    var theMedia = filter(state.media, decodeURIComponent(ownProps.params.mediaName));
    //console.log("media populated?",state.media.length);
    return {
        //list: filter(state.media, ownProps.params.userid|| "all", auth.getCurrentUser().userId)
        media: theMedia,
        mediaLink : decodeURIComponent(ownProps.params.mediaLink)
    };
}

/*
function mapDispatchToProps(dispatch, ownProps){
    return {
    };
}
*/

export default connect(mapStateToProps)(VerMedia);