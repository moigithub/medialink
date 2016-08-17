'use strict';
var Media = require('./api/media/media.model');

Media.find({}).remove(function(){
  Media.create(
  { //id: 0, 
    title: 'el Titulo1', 
    whichUserIDPosted: 'yoni123',
    imageUrl: 'http://placehold.it/200x200',
    lastUpdated: 123123123,
    shouldUpdate: false,
    userRate: [{userid:'0', rating: 5}],
    categories: ['accion', 'suspenso'],
    tags: ['uno', 'dos'],
    linkType: 'anime',
    likesCounter: 123,
    viewCounter : 43545,
    description: 'lorem ipsum bla bla me',
    capitulos: [
      { num: 1,
        nombre: 'capitulo 1',
        nombreAlternativo: 'boo boo',
        dateAdded: 452453451,
        mirrors: [
          {
            host: 'youtube',
            link: 'http://youtu.be/asdf23f',
            dateAdded: 452453451,
            brokenStatus: 5,
            userID: '14324',
            enabled: false
          },
          {
            host: 'mediafire',
            link: 'http://mediafire.com/sf42343f',
            dateAdded: 452453451,
            brokenStatus: 0,
            userID: '14324',
            enabled: true
          }
        ]
      }
    ]
  },
  

  { //id: 1,
    title: 'el Titulo2', 
    whichUserIDPosted: 'yoni123',
    imageUrl: 'http://placehold.it/200x200',
    lastUpdated: 123123123,
    shouldUpdate: false,
    userRate: [{userid:'0', rating: 2}],
    categories: ['drama', 'terror'],
    tags: ['uno', 'tres'],
    linkType: 'serie',
    likesCounter: 13,
    viewCounter : 445,
    description: 'boo baa mee nuu lorem ipsum bla bla me',
    capitulos: [
      { num: 1,
        nombre: 'capitulo 1',
        nombreAlternativo: 'je bee',
        dateAdded: 452453451,
        mirrors: [
          {
            host: 'youtube',
            link: 'http://youtu.be/a13',
            dateAdded: 452453451,
            brokenStatus: 1,
            userID: '14324',
            enabled: true
          },
          {
            host: 'vimeo',
            link: 'http://vimeo.com/sf42343f',
            dateAdded: 452453451,
            brokenStatus: 3,
            userID: '14324',
            enabled: true
          }
          
        ]  // mirror
      },
      { num: 2,
        nombre: 'capitulo 2',
        nombreAlternativo: 'noi je bee',
        mirrors: [
          {
            host: 'vimeo',
            link: 'http://vimeo.com/234fd42f',
            dateAdded: 452453451,
            brokenStatus: 0,
            enabled: true
          }
        ]  //mirrors
      }
    ]
  }  
)
});


// ultimo capitulos agregados, ordenado por fecha del actual al mas viejo
// puede que se agregen 10 capitulos de mismo anime, no importa
// la fecha manda
var capitulos= [
  { animeId: 0, 
    title: 'el Titulo1', 
    imageUrl: 'http://placehold.it/64x64',
    numCapitulo: 1,
    nombre: 'capitulo 1',
    nombreAlternativo: 'boo boo',
    dateAdded: 452453451,
  },
  { animeId: 1,
    title: 'el Titulo2', 
    imageUrl: 'http://placehold.it/64x64',
    numCapitulo: 1,
    nombre: 'capitulo 1',
    nombreAlternativo: 'je bee',
    dateAdded: 452453451,
  }  
];


