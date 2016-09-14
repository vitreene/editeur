import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export let VueSchema = new SimpleSchema({
  _id:{type:String}, // mongoId
  ordre: {type:Number},
  visible : {type:Boolean},
  titre: {
    type: String,
    min:3,
    max:24
  },
  vignette: {type:String}, // idem ikono
  sequence_id: {type:String},
  source_id: {type:String},
  metas_id: {type:String},
  //ikono_id: {type:String}, -> ikono est dans source
  modele: {type:String},
  skin: {type:String, optional: true },
  couleur:{ type:String, optional: true }
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
  ecran: {type:String},
  placement: {type:String}, // cover, contains, libre
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
  // à viendre
})

export let MetasSchema = new SimpleSchema({
  _id:{type:String}, // mongoId
  source: {type:SourceMetasSchema},
  ikono : {type:[IkonoPositionMetasSchema]},
  // ikono : {type:IkonoMetasSchema},
  accroche: {type:AccrocheMetasSchema}
});

const IkonoPubschema = new SimpleSchema({
  src: {type:String},  // URL, optimisée
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
  proxy: {type:IkonoPubschema}, // optimisé pour la Projection
})
