'use strict';
import React, {Component} from 'react';

export default class AddMediaForm extends Component {
    render(){
        return (
            <form action="">
                <div class="form-group">
                    <label for="title">Anime name</label>
                    <input type="text" class="form-control" id="title" placeholder="Anime name">
                 </div>
                <div class="form-group">
                    <img />
                    <label for="imageUrl">Image</label>
                    <input type="text" class="form-control" id="image" placeholder="Image url">
                 </div>
                <div class="form-group">
                    <label for="categ">Categories (separated by comma)</label>
                    <input type="text" class="form-control" id="categ" placeholder="List of Categories">
                 </div>
                <div class="form-group">
                    <label for="tags">Tags (separated by comma)</label>
                    <input type="text" class="form-control" id="tags" placeholder="List of Tags">
                 </div>
                <div class="form-group">
                    <label for="type">Media Type</label>
                    <input type="text" class="form-control" id="type" placeholder="Anime or Serie or Documental">
                 </div>
                <div class="form-group">
                    <label for="desc">Sinopsis</label>
                    <input type="text" class="form-control" id="desc" placeholder="Sinopsis">
                 </div>
                <div class="form-group">
                    <label for="desc">Sinopsis (100 chars max)</label>
                    <input type="text" class="form-control" id="desc" placeholder="Sinopsis">
                 </div>
                <div class="form-group">
                    <label for="desc">Sinopsis</label>
                    <input type="text" class="form-control" id="desc" placeholder="Sinopsis">
                 </div>
                 
            </form>
        );
    }
}