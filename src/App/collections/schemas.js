import {SimpleSchema} from 'meteor/aldeed:simple-schema'

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


export let VueSchema = new SimpleSchema({
  _id:{type:String}, // mongoId
  ordre: {type:Number},
  visible : {type:Boolean},
  titre: {
    type: String,
    min:3,
    max:24
  },
  vignette: {type:String},
  sequence_id: {type:String},
  source_id: {type:String},
  modele: {type:String},
  skin: {type:String, optional: true },
  couleur:{ type:String, optional: true }

});
/*
import { Class } from 'meteor/jagi:astronomy'
import Sources from 'App/collections/Sources'

export let  Source = Class.create({
  name: 'Source',
  collection: Sources,
  fields: {
    // _id: Mongo.ObjectID,
    _id: String,
    titre: {type: String, optional: true },
    description: {type: String, optional: true }, // ou message ?
    offre : {type: String, optional: true },
    prix: {type: Number, optional: true },
    prix_promo : {type: Number, optional: true },
    ikono_id : {type: String, optional: true },
  },
  methods: {
  }
});
*/


/*
*/
