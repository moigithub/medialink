'use strict';
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class MasVotados extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (    
            <div className="masVistos">
                <h3>Mas Votados</h3>
                {this.props.list.map((media,i)=>(
                    <div className="cuadrito media" key={"media"+i}>
                        <div className="media-left">
                            <img className="img-thumbnail media-object" src={media.imageUrl}/>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{media.title}</h4>
                            <div className="description">{media.description}</div>
                        </div>
                    </div>
                ))}
            </div>
            );
    }
}
MasVotados.propTypes ={
    list: PropTypes.arrayOf(PropTypes.object)
}

//helpers



function mapStateToProps(state, ownProps){
    //console.log("tag list",state);
    return {
        list: state.masVotados
    };
}

function mapDispatchToProps(dispatch){
    
}

export default connect(mapStateToProps)(MasVotados);