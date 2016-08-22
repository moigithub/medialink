'use strict';
import React, {Component} from 'react';

export default class AddMediaForm extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addCapitulos = this.addCapitulos.bind(this);
        this.removeLink = this.removeLink.bind(this);
        this.anularMirror  = this.anularMirror.bind(this);
        this.addMirror = this.addMirror.bind(this);
        this.handleMirrorLink = this.handleMirrorLink.bind(this);
        this.submitData = this.submitData.bind(this);

        this.state = {
            mediaimage:'',
            medianame:'',
            mediacategs:'',
            mediatags:'',
            mediatype:'',
            mediadesc:'',
            
            linkName:'',
            linkUrl:'',
            
            
            links:[
                { linkName: "Capitulo 1",
                  linkUrl:[
                  {
                    link: 'http://youtu.be/asdf23f',
                    dateAdded: 452453451,
                    brokenStatus: 5,
                    userID: '14324',
                    enabled: false
                  },
                  {
                    link: 'http://mediafire.com/sf42343f',
                    dateAdded: 452453451,
                    brokenStatus: 0,
                    userID: '14324',
                    enabled: true
                  }                    
                    ]
                }
                ]
        };
    }
    
    submitData(e){
        e.preventDefault();
        console.log(JSON.stringify(this.state));
    }
    
    handleMirrorLink(capituloLink, mirrorLink, e){
        var newLinks= this.state.links.slice();
        newLinks[capituloLink].linkUrl[mirrorLink].link = e.target.value;
        this.setState({links: newLinks});
    }
    
    handleChange(e){
        //console.log("control",e.target);
        var newState = {};
        newState[e.target.name]=e.target.value;
        this.setState(newState);
    }
    
    addCapitulos(){
        var newLinks= this.state.links.slice();
        newLinks.push({linkName:this.state.linkName, 
                        linkUrl:this.state.linkUrl.split("\n").map(link=>
                            {  return{ link:link,
                                dateAdded: new Date(),
                                brokenStatus: 0,
                                userID: '14324',
                                enabled: true}
                            }
                        )});
        this.setState({links:newLinks});
    }
    
    removeLink(capituloIndex){
        var newLinks= this.state.links.slice();
        newLinks.splice(capituloIndex, 1);
        this.setState({links:newLinks});
    }
    
    anularMirror(capituloIndex, mirrorIndex){
        console.log("rem mirror");
        var newLinks= this.state.links.slice();
        newLinks[capituloIndex].linkUrl.splice(mirrorIndex,1);
        this.setState({links: newLinks});
    }
    
    addMirror(capituloIndex){
        console.log("add mirror");
        var newLinks= this.state.links.slice();
        newLinks[capituloIndex].linkUrl.push({link:'',
                                dateAdded: new Date(),
                                brokenStatus: 0,
                                userID: '14324',
                                enabled: true});
        this.setState({links: newLinks});
    }
    
    render(){
        return (
            <div className="container">
            <h3>Add new Media Link</h3>
            <form action="" className="form-horizontal">
                <div className="form-group row">
                    <label className="control-label col-sm-2" htmlFor="title">Media name</label>
                    <div className="col-sm-10">
                        <input type="text" name="medianame" value={this.state.medianame} className="form-control" onChange={this.handleChange} id="title" placeholder="Media name"/>
                    </div>
                 </div>
                <div className="form-group row">
                    <label className="control-label col-sm-2" htmlFor="imageUrl">Image</label>
                    <div className="col-sm-8">
                        <input type="text" name="mediaimage" value={this.state.mediaimage} className="form-control" onChange={this.handleChange} id="image" placeholder="Image url"/>
                    </div>
                    <img className="img-responsive col-sm-2" src="http://placehold.it/200x200"/>
                 </div>
                <div className="form-group row">
                    <label className="control-label col-sm-2" htmlFor="categ">Categories (separated by comma)</label>
                    <div className="col-sm-10">
                        <input type="text" name="mediacategs" className="form-control" onChange={this.handleChange} id="categ" placeholder="List of Categories"/>
                    </div>
                 </div>
                <div className="form-group row">
                    <label className="control-label col-sm-2" htmlFor="tags">Tags (separated by comma)</label>
                    <div className="col-sm-10">
                        <input type="text" name="mediatags" className="form-control" onChange={this.handleChange} id="tags" placeholder="List of Tags"/>
                    </div>
                 </div>
                <div className="form-group row">
                    <label className="control-label col-sm-2" htmlFor="type">Media Type</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handleChange} id="type" placeholder="Anime or Serie or Documental"/>
                        <div className="input-group">
                            <label className="form-check-inline">
                              <input className="form-check-input" onChange={this.handleChange} type="radio" name="mediatype" value="Anime" /> Anime
                            </label>
                        </div>
                        <div className="input-group">
                            <label className="form-check-inline">
                              <input className="form-check-input" onChange={this.handleChange} type="radio" name="mediatype" value="Serie" /> Serie
                            </label>
                        </div>
                        <div className="input-group">
                            <label className="form-check-inline">
                              <input className="form-check-input" onChange={this.handleChange} type="radio" name="mediatype" value="Documental" /> Documental
                            </label>
                        </div>
                    </div>
                 </div>
                <div className="form-group row">
                    <label className="control-label col-sm-2" htmlFor="desc">Sinopsis (100 chars max)</label>
                    <div className="col-sm-10">
                        <input type="text" name="mediadesc" className="form-control" onChange={this.handleChange} id="desc" placeholder="Sinopsis"/>
                    </div>
                </div>
                
                <hr/>
                 
                <div id="LinkList">
                    <h3>Links</h3>
                    <div id="LinkListForm">
                        <div className="form-group row">
                            <label className="control-label col-sm-2" htmlFor="linkName">Link Title</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={this.state.linkName} onChange={this.handleChange} name="linkName" id="linkName" placeholder="Link Title"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-sm-2" htmlFor="linkUrl">Links (1 URL per line)</label>
                            <div className="col-sm-10">
                                <textarea type="text" className="form-control" value={this.state.linkUrl} onChange={this.handleChange} name="linkUrl" rows={5} id="linkUrl" placeholder="URL"/>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="button" onClick={this.addCapitulos}>Add</button>
                    </div>
<hr/>
                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                        {this.state.links.map((link,linkIndex)=>{
                        // linkName, linkUrl[]
                                    let mirrorLinks = link.linkUrl.map((url,urlIndex)=>{
                                        return (
                                            <div className="form-group row" key={"mirror"+urlIndex}>
                                                <label className="control-label col-sm-2" >Link URL</label>
                                                <div className="col-sm-9">
                                                    <input type="text" value={url.link} onChange={this.handleMirrorLink.bind(this,linkIndex, urlIndex)} className="form-control" placeholder="URL"/>
                                                </div>
                                                <button className="col-sm-1 btn btn-danger" type="button" onClick={this.anularMirror.bind(this,linkIndex,urlIndex)}>X</button>
                                            </div>
                                        );
                                    })
                            
                                    
                        return (
                          <div className="panel panel-info" key={"link"+linkIndex}>
                            <div className="panel-heading" role="tab" id="headingOne">
                                <h4 className="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        {link.linkName}
                                    </a>
                                    <button type="button" className="btn btn-danger" onClick={this.removeLink.bind(this,linkIndex)}>Remove</button>
                                </h4>
                            </div>
                            <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                <div className="panel-body">
                                    {mirrorLinks}
                                </div>
                                <div className="panel-footer">
                                    <button className="btn btn-info" type="button" onClick={this.addMirror.bind(this,0)}>Add Mirror</button>
                                </div>
                            </div>
                          </div>
                        );
                        })
                        }  
                      

                    </div>

                
                </div>
                
                

                 <hr/>
                <button className="btn btn-primary" type="submit" onClick={this.submitData}>Submit</button>
            </form>
            </div>
        );
    }
}