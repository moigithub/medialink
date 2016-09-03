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
        console.log("vermedia comp.Will mount", this.props);
        let mirrors = getMirrors(this.props.media, this.props.mediaLink) ||[];
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
        let mirrors = getMirrors(media, mediaLink) ||[];
        //console.log("render mirror",mirrors);
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
                        <h3>{mediaLink}</h3>
                        {mirrors.length && <div className="embed-responsive embed-responsive-4by3">
                          <iframe className="embed-responsive-item" ref="visor" src={this.state.currentUrl}></iframe>
                        </div>
                        }
                        <div id="listaCapitulos">
                            <h3>Mirror List</h3>
                            {!!mirrors && <ul className="list-group">
                                {mirrors.map((mirror,i)=>(
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