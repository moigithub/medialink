'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

;

var MediaSchema = new Schema({
    ///id: 0,  //Schema.Types.ObjectId
    title: String, 
    whichUserIDPosted: String,
    imageUrl: String,
    lastUpdated: Date,
    shouldUpdate: Boolean,
    userRate: [{userId: Schema.Types.ObjectId, rating: Number}],  //[{userid:'0', rating: 5}],
    categories: [String], //['accion', 'suspenso'],
    tags: [String], //['uno', 'dos'],
    mediaType: String,
    likesCounter: Number,
    viewCounter : Number,
    description: String,
    capitulos: [{
        num: Number,
        nombre: String,
        mirrors: [
          {
            link: String,
            dateAdded: Date,
            brokenStatus: Number,
            userID: String,
            enabled: Boolean
          }   
        ] 
    }]
});

module.exports = mongoose.model('Media', MediaSchema);