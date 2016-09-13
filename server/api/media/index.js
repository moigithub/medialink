'use strict';

var express = require('express');
var moment = require('moment');
var router = express.Router();
var Media = require('./media.model');
//var isLoggedIn = require('../auth').isLoggedIn;

// all media
router.get('/', function(req, res) {
  
  /// TODO uses req.query to filter data
  var azFilter = req.query.azFilter;
  var categFilter = req.query.categ;
  var mediaTypeFilter = req.query.mediatype;
  
  var searchObj = {};
  if(azFilter) searchObj["firstChar"]=  { $in: azFilter.split(",") } ; // $in similar to or
  // $in $OR
  if(categFilter) searchObj["categories"]= { $all: categFilter.split(",") }; //) }; 
  if(mediaTypeFilter) searchObj["mediaType"]= { $in: mediaTypeFilter.split(",") }; //) }; 
  
  console.log("filter params", searchObj, " query", req.query);
  /*
    Media.find(function (err, media) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(media);
    });
    */
    //yearSubstring: { $substr: [ "$quarter", 0, 2 ] },
    
    Media.aggregate([
      { $project: {
          firstChar: { $toUpper: { $substr: [ "$title", 0, 1 ] } },
          title: 1,
          imageUrl: 1,
          dateAdded: 1,
          userRate: 1,  //[{userid:'0', rating: 5}],
          categories: 1, //['accion', 'suspenso'],
          tags: 1, //['uno', 'dos'],
          mediaType: 1,  //anime serie documental receta
          likesCounter: 1,
          viewCounter : 1,
          description: 1,
          capitulos: 1
        }
      },
      { $match: searchObj
  //    { 
   //       firstChar:  { $in: azFilter },
  //        categories: { $all: categFilter },
  //        mediaType: mediaTypeFilter
  //      }
        
      },
      { $sort: { title: 1, dateAdded: -1}}
      ], function(err, media){
        if(err) { return handleError(res, err); }
        //console.log(media);
        return res.status(200).json(media);
      
    })
});


router.get('/latestMediaLink', function(req, res) {
  /*
    Media.find(function (err, media) {
        if(err) { return handleError(res, err); }
        console.log("medialink");
        return res.status(200).json(media);
    });
 */   
 //console.log(moment().subtract(7, 'days'));
    Media.aggregate( [ 
 //       { $match: { "dateAdded":{ $gt: moment().subtract(7, 'days')}}},
         { $unwind : "$capitulos" },
         { $project : {
              title : 1,
              imageUrl: 1,
              //capitulos : 1,
              //"capitulos.dateAdded" : 1,
              capitulo : "$capitulos.nombre",
              dateAdded: "$capitulos.dateAdded"
        }},
        { $sort : { "capitulo" : -1 } },
        { $limit : 10 }
      ] , function(err, media) {
        if(err) { return handleError(res, err); }
        //console.log(media);
        return res.status(200).json(media);
      });
});
/*
// media by user
router.get('/user/:id', isLoggedIn, function(req, res) {
    media.find({userId: req.params.id}, function (err, media) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(media);
    });
});
*/

// create new media
router.post('/',  function(req, res) {
  
    var obj ={
      title: '', 
      whichUserIDPosted: '',
      imageUrl: '',
      dateAdded: new Date(),
      lastUpdated: new Date(),
      shouldUpdate: true,
      userRate: [],  //[{userid:'0', rating: 5}],
      categories: [], //['accion', 'suspenso'],
      tags: [], //['uno', 'dos'],
      mediaType: '',
      likesCounter: 0,
      viewCounter : 0,
      description: '',
      capitulos: []
    };
    
    var mediaData = Object.assign({}, obj, req.body);
    console.log("post image create",mediaData);
    Media.create(mediaData, function(err, media) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(media);
    });
});

/*
// Deletes image
router.delete('/:id', isLoggedIn, function(req, res) {
  media.findById(req.params.id, function (err, media) {
    if(err) { return handleError(res, err); }
    if(!media) { return res.status(404).json({msg:'Not Found'}); }
    media.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
});

router.put('/:id',  function(req, res) {
  if(req.body._id) { delete req.body._id; }
//  console.log("put media",req.body);
  media.findById(req.params.id, function (err, img) {
    if (err) { return handleError(res, err); }
    if(!img) { return res.status(404).send('Not Found'); }
    //var updated = _.merge(votes, req.body);
    //var updated = _.extend(votes, req.body);
    //////////////////////
    img.likesCount = req.body.likesCount;
    
    img.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(img);
    });
  });
});

*/

function handleError(res, err) {
  return res.status(500).send(err);
}

module.exports = router;