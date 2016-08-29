'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class ListaCapitulos extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (    
            <div className="row">
                <div className="list">
                {this.props.list.map((media,i)=>(
                    <div className="col-xs-6 col-sm-4 col-lg-3" key={"media"+i}>
                        <div className="cuadro">
                            <a className="enlace" href={"/"+media.title+"/"+media.capitulo}>
                                <h3 className="titulo">{media.title}</h3>
                                <h4 className="capitulo">{media.capitulo}</h4>
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
ListaCapitulos.propTypes ={
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}


function mapStateToProps(state, ownProps){
    console.log(state);
    return {
        list: state.mediaLink
    };
}
/*
function mapDispatchToProps(dispatch){
    return {
        removeImage: image=>dispatch(RemoveImageAsync(image))
    };
}
*/

export default connect(mapStateToProps)(ListaCapitulos);



