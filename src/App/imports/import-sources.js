export let maSource = [
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
    proxy:'', // dans l'éditeur,
    instance_01: '' // provisoire : version par ecran
    // ajouter : cerne et point focal
  }
] ;
