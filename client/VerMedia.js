'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as auth from './clientAuth';
import { Router, Route, Link, browserHistory, withRouter } from 'react-router';
/*
MUESTRA EL LINK CON TODOS SUS MIRRORS
*/
class VerMedia extends Component {
    constructor(props){
        super(props);
        this.setMirrorUrl = this.setMirrorUrl.bind(this);
        
        this.state =  {currentUrl:''};
    }
    
    componentWillReceiveProps(nextProps){
        // set the current media link on the video player
        console.log("willreceiveProps",this.props, "next:",nextProps);
        if(!nextProps.media.error) {
            let mirrors = getMirrors(nextProps.media, nextProps.mediaLink) ||[];
            if ((mirrors.length>0 && this.state.currentUrl==='')|| this.props.mediaLink !== nextProps.mediaLink)
                this.setState({currentUrl: mirrors[0].link});
        }
    }
    
    componentDidMount(){
        console.log("vermedia comp.did mount", this.props);
    }
    
    componentWillMount(){
        // set the current media link on the video player
        console.log("vermedia comp.Will mount", this.props);
        let mirrors = getMirrors(this.props.media, this.props.mediaLink) || [];
        console.log("vermedia mirrors", mirrors);
        if(mirrors.length>0 && this.state.currentUrl==='')
            this.setState({currentUrl: mirrors[0].link});
    }

    setMirrorUrl(url){
        console.log("setMirrorUrl", url);
        this.setState({currentUrl: url});
    }
    
    render(){
        let {media, mediaLink} = this.props;
        //let mirrors = getMirrors(media, mediaLink) ||[];
        let capitulos = getCapitulos(media, mediaLink) || [];
        //console.log("render mirror",mirrors);
        console.log("verMedia, capitulos",capitulos);
        return (    
            <div className="list container">
                {media && media.title  && <div className="row">
                    <div className="col-xs-5 col-sm-4 col-lg-3">
                        <Link to={`/MediaInfo/${media.title}`}><h3 className="titulo">{media.title}</h3></Link>
                        
                        <img className="img-responsive" src={media.imageUrl}/>
                        <div id="listaCapitulos">
                            {media.capitulos && media.capitulos.length && <ul>
                                {media.capitulos.map((cap,i)=>(
                                    <li key={"capitulo"+i}><Link to={"/verMedia/"+media.title+"/"+cap.nombre}>{cap.nombre}</Link></li>
                                ))}
                            </ul>}
                        </div>
                    </div>
                    <div className="col-xs-7 col-sm-8 col-lg-9">
                        {media.capitulos.length && <div id="mediaContent">
                          <h3>{mediaLink}
                            <div className="prev-next">
                                <span>{capitulos[0] && <Link to={"/verMedia/"+media.title+"/"+capitulos[0].nombre}>Previous</Link>}</span>
                                <span>{capitulos[2] && <Link to={"/verMedia/"+media.title+"/"+capitulos[2].nombre}>Next</Link>}</span>
                            </div>
                          </h3>
                          <div className="embed-responsive embed-responsive-4by3">
                               <iframe className="embed-responsive-item" ref="visor" src={this.state.currentUrl}></iframe>
                          </div>
                        </div>
                        }
                        <div id="listaCapitulos">
                            <h3>Mirror List</h3>
                            {!!capitulos[1].mirrors.length && <ul className="list-group">
                                {capitulos[1].mirrors.map((mirror,i)=>(
                                    <li onClick={this.setMirrorUrl.bind(this,mirror.link)} key={"mirror"+i} className="list-group-item list-group-item-info">{mirror.link}
                                    &nbsp; - posted by: <span className="user">{mirror.userID}</span> 
                                    <button className="btn btn-danger btn-xs pull-right">Report broken</button>
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

function getCapitulos(theMedia, mediaLink){
    console.log("getCapitulos media ",theMedia, "link", mediaLink);
    //devuelve un array de 3 elementos [anterior, actual, siguiente]
    //si algun elemento no existe.. null
    if(theMedia.error) return false;
    var elCapitulo= theMedia.capitulos.findIndex(capitulo => capitulo.nombre === mediaLink);
    console.log("getCapitulos capitulo ",elCapitulo, "len",theMedia.capitulos.length-1);
    if(elCapitulo===-1) {
        console.log("getCapitulos todo null");
        return [null,null,null];
    } else if(elCapitulo === 0) {
        if(theMedia.capitulos.length>1){
            console.log("getCapitulos x,a,b");
            return [null, theMedia.capitulos[0], theMedia.capitulos[1]];
        }
            console.log("getCapitulos x,a,x");
        return [null, theMedia.capitulos[0], null];
    } else if(elCapitulo === theMedia.capitulos.length-1) {
        console.log("getCapitulos acanga");
        if(theMedia.capitulos.length>1){
            console.log("getCapitulos a,b,x");
            return [theMedia.capitulos[elCapitulo-1], theMedia.capitulos[elCapitulo], null];
        }
        console.log("getCapitulos x,a,x");
        return [null, theMedia.capitulos[elCapitulo], null];
    } else if(elCapitulo >0 && elCapitulo< theMedia.capitulos.length-1){
            console.log("getCapitulos a,b,c");
        return [theMedia.capitulos[elCapitulo-1], theMedia.capitulos[elCapitulo], theMedia.capitulos[elCapitulo+1]];
    }
    console.log("getCapitulos nada");
    return false;
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

export default withRouter(connect(mapStateToProps)(VerMedia));