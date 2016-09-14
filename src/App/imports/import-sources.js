export let source = [
    {
      _id : '01',
      titre : 'ma vignette 01',
      ikono_id:'ik01',
      description: 'Test de la source',
      offre : 'trois pour le prix d’un !',
      prix:50,
      prix_promo:49.90
    },

  ] ;

export let metas = [
  {
    _id: 'met01',
    source:{
      lien: true,
      position:'gauche'
    },
    ikono:[
      {
        ecran: {type:String},
        placement: {type:String}, // cover, contains, libre
        pox: {type:Number}, // deplacement horizontal
        poy : {type:Number}, // deplacment vertical
        rot : {type:Number}, // rotation en degrés
        ech : {type:Number}, // echelle
        pivX: {type:Boolean}, // miroir horizontal,
        pivY: {type:Boolean}, // miroir vertical
      }
    ],
    accroche:{}
  }
]
/*

*/
const accroche = [
  {
    _id:'01',
    type: 'accroche',
    modele : 'cercle01',
    text: 'trois pour le prix de deux',
  },
  {
    _id:'02',
    type : 'condition',
    modele: 'etoile',
    text: 'aujourd’hui seulement'
  }
] ;

const ikono = [
  {
    _id : '01',
    src: 'images-2iADQeK.jpg', // original
    vignette:'', // sur les listes,
    preview:'', // dans l'éditeur,
    proxys: [] // provisoire : version par ecran
    // ajouter : cerne et point focal
  }
] ;
