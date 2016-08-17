'use strict';

var express = require('express');
var router = express.Router();
var Media = require('./media.model');
//var isLoggedIn = require('../auth').isLoggedIn;

// all images
router.get('/', function(req, res) {
    Media.find(function (err, images) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(images);
    });
});

/*
// images by user
router.get('/user/:id', isLoggedIn, function(req, res) {
    Images.find({userId: req.params.id}, function (err, images) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(images);
    });
});


// create new images
router.post('/', isLoggedIn, function(req, res) {
    console.log("post image create",req.body);
    Images.create(req.body, function(err, images) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(images);
    });
});


// Deletes image
router.delete('/:id', isLoggedIn, function(req, res) {
  Images.findById(req.params.id, function (err, images) {
    if(err) { return handleError(res, err); }
    if(!images) { return res.status(404).json({msg:'Not Found'}); }
    images.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
});

router.put('/:id',  function(req, res) {
  if(req.body._id) { delete req.body._id; }
//  console.log("put images",req.body);
  Images.findById(req.params.id, function (err, img) {
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