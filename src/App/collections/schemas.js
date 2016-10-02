import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export let SequenceSchema = new SimpleSchema({
  _id:{type:String}, // mongoId
  liste_id:{type:String},
  nom:{type:String},
  vignette: {type:String}, // url, ou id d'une Vue
  tempo:{type:String},
  skin:{type:String},
  zone:{type:String},
});

export let  CardSchema = new SimpleSchema({
  vue_id:{type:String}, // mongoId
  ordre: {type:Number},
  visible : {type:Boolean},
  titre: {
    type: String,
    min:3,
    max:24
  },
  vignette: {type:String}, // idem ikono
  couleur:{ type:String, optional: true },
})

export let CardVueSchema = new SimpleSchema({
  _id:{type:String}, // mongoId
  liste:{type:[CardSchema]}
});

export let VueSchema = new SimpleSchema({
  _id:{type:String}, // mongoId
/////
/*
  titre: {
    type: String,
    min:3,
    max:24
  },
  vignette: {type:String}, // idem ikono
  couleur:{ type:String, optional: true },
  */
/////
  sequence_id: {type:String},
  source_id: {type:String},
  metas_id: {type:String},
  //ikono_id: {type:String}, -> ikono est dans source
  modele: {type:String},
  skin: {type:String, optional: true },
});

export let SourceSchema = new SimpleSchema({
  _id:{type:String}, // mongoId
  titre: {type: String, optional: true },
  description: {type: String, optional: true }, // ou message ?
  offre : {type: String, optional: true },
  prix: {
    type: Number,
    optional: true,
    decimal: true
   },
  prix_promo : {
    type: Number,
    optional: true,
    decimal: true
   },
  ikono_id : {type: String, optional: true },
});

const SourceMetasSchema =  new SimpleSchema({
  lien : {type: Boolean},
  position : {type:String} // haut/bas/gauche/droite/centre
})

const IkonoPositionMetasSchema =  new SimpleSchema({
  zone: {type:String}, // zone composite ou ecran
  placement: {type:String}, // cover, contains, libre
  pristine: {type:Boolean}, //indique si l'image a été manipulée
  pox: {type:Number}, // deplacement horizontal
  poy : {type:Number}, // deplacment vertical
  rot : {type:Number}, // rotation en degrés
  ech : {type:Number}, // echelle
  pivX: {type:Boolean}, // miroir horizontal,
  pivY: {type:Boolean}, // miroir vertical
})
/*
const IkonoPositionMetasSchema =  new SimpleSchema({
  x: {type:String},
  y : {type:String},
  rotation : {type:String},
  echelle : {type:String},
  cover: {type:Boolean},
  contains: {type:Boolean},
  pivotX: {type:Boolean},
  pivotY: {type:Boolean},
})
*/
/*
const IkonoMetasSchema =  new SimpleSchema({
  ecrans : {type:[IkonoPositionMetasSchema]},
})
*/

const AccrocheMetasSchema =  new SimpleSchema({
  //type : {type:String}, // action | condition | legal
  aspect : {type:String}, //badge | bandeau |
  position : {type:Object},
  'position.bandeau' : {type:String}, // haut | bas | flottant
  'position.badge' : {type:String}, //libre | avant | après
  modele : {type:String}, // nom d’un modele
  texte : {type:String}
})

export let MetasSchema = new SimpleSchema({
  _id:{type:String}, // mongoId
  source: {type:SourceMetasSchema},
  ikono : {type:[IkonoPositionMetasSchema]},
  // ikono : {type:IkonoMetasSchema},
  accroche : {type:Object},
  'accroche.action' : {type:AccrocheMetasSchema, optional: true },
  'accroche.condition' : {type:AccrocheMetasSchema, optional: true },
  'accroche.legal' : {type:AccrocheMetasSchema, optional: true },
});

const IkonoPubschema = new SimpleSchema({

  x: {type:String}, // point focal : x
  y : {type:String},// point focal : y
  rx : {type:String},// longueur de l'axe x du cerne
  ry : {type:String},// longueur de l'axe x du cerne
  radius : {type:String},// arroundi du cerne : r
})

export let IkonoSchema = new SimpleSchema({
  _id: {type:String}, // mongoId
  src: {type:String},  // URL, original
  vignette: {type:String}, // source URL sur les listes,
  preview: {type:String}, // source URL dans l'éditeur,
  "proxy.$.src": {type:String},  // URL, optimisée
  "proxy.$.zone":{type:String},  // zone de projection
  cerne: {type:IkonoPubschema},
})


export let onAirSchema = new SimpleSchema({
  play: {type:Boolean},
  pointeur: {type:Number},
  currentID:{type:String},
  nextID:{type:String},
  abortNext:{type:String}
});

export let ProjectionsSchema = new SimpleSchema({
  _id:{type:String}, // mongoId
  onAir:{type:onAirSchema}, // -> Projection
  ordre :{type:[String]},
  vuesData :{type:[Object], blackbox: true } // -> Projection
});
