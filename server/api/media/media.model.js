'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

;

var MediaSchema = new Schema({
    ///id: 0,  //Schema.Types.ObjectId
    title: String, 
    whichUserIDPosted: String,
    imageUrl: String,
    dateAdded: Date,
    lastUpdated: Date,
    shouldUpdate: Boolean,
    userRate: [{userId: Schema.Types.ObjectId, rating: Number}],  //[{userid:'0', rating: 5}],
    categories: [String], //['accion', 'suspenso'],
    tags: [String], //['uno', 'dos'],
    mediaType: String,  //anime serie documental receta
    likesCounter: Number,
    viewCounter : Number,
    description: String,
    capitulos: [{
        num: Number,
        nombre: String,
        dateAdded: Date,
        mirrors: [
          {
            link: String,
            brokenStatus: Number,
            dateAdded: Date,
            userID: String,
            enabled: Boolean
          }   
        ] 
    }]
});

module.exports = mongoose.model('Media', MediaSchema);