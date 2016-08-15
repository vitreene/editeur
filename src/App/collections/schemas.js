
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



/*
*/
