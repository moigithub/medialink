'use strict';
var counter = 0;

var data= [
  { id: 0, 
    title: 'el Titulo1', 
    whichUserIDPosted: 'yoni123',
    imageUrl: 'http://placehold.it/200x200',
    dateAdded: 452453451,
    lastUpdated: 123123123,
    shouldUpdate: false,
    userRate: [{userid:'0', rating: 5}],
    categories: ['accion', 'suspenso'],
    tags: ['uno', 'dos'],
    mediaType: 'anime',
    likesCounter: 123,
    viewCounter : 43545,
    description: 'lorem ipsum bla bla me',
    capitulos: [
      { num: 1,
        nombre: 'capitulo 1',
        dateAdded: 452453451,
        mirrors: [
          {
            link: 'http://youtu.be/asdf23f',
            brokenStatus: 5,
            dateAdded: 452453451,
            userID: '14324',
            enabled: false
          },
          {
            link: 'http://mediafire.com/sf42343f',
            brokenStatus: 0,
            dateAdded: 452453451,
            userID: '14324',
            enabled: true
          }
        ]
      }
    ]
  },
  { id: 1,
    title: 'el Titulo2', 
    whichUserIDPosted: 'yoni123',
    imageUrl: 'http://placehold.it/200x200',
    lastUpdated: 123123123,
    dateAdded: 452453451,
    shouldUpdate: false,
    userRate: [{userid:'0', rating: 2}],
    categories: ['drama', 'terror'],
    tags: ['uno', 'tres'],
    mediaType: 'serie',
    likesCounter: 13,
    viewCounter : 445,
    description: 'boo baa mee nuu lorem ipsum bla bla me',
    capitulos: [
      { num: 1,
        nombre: 'capitulo 1',
        dateAdded: 452453451,
        mirrors: [
          {
            link: 'http://youtu.be/a13',
            brokenStatus: 1,
            dateAdded: 452453451,
            userID: '14324',
            enabled: true
          },
          {
            link: 'http://vimeo.com/sf42343f',
            brokenStatus: 3,
            dateAdded: 452453451,
            userID: '14324',
            enabled: true
          }
          
        ]  // mirror
      },
      { num: 2,
        nombre: 'capitulo 2',
        dateAdded: 452453451,
        mirrors: [
          {
            link: 'http://vimeo.com/234fd42f',
            brokenStatus: 0,
            dateAdded: 452453451,
            enabled: true
          }
        ]  //mirrors
      }
    ]
  }  
];


// ultimo capitulos agregados, ordenado por fecha del actual al mas viejo
// puede que se agregen 10 capitulos de mismo anime, no importa
// la fecha manda
var capitulos= [
  { animeId: 0, 
    title: 'el Titulo1', 
    imageUrl: 'http://placehold.it/64x64',
    numCapitulo: 1,
    nombre: 'capitulo 1',
    dateAdded: 452453451,
  },
  { animeId: 1,
    title: 'el Titulo2', 
    imageUrl: 'http://placehold.it/64x64',
    numCapitulo: 1,
    nombre: 'capitulo 1',
    dateAdded: 452453451,
  }  
];


module.exports={
  data: data,
  capitulos: capitulos
}